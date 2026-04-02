import { Audio, AVPlaybackSource, AVPlaybackStatus } from "expo-av";
import backgroundTimer from "./background-timer";

export interface AudioPlayerState {
	isPlaying: boolean;
	isLoaded: boolean;
	position: number;
	duration: number;
}

class AudioPlayer {
	private sound: Audio.Sound | null = null;
	private onStatusUpdate: ((state: AudioPlayerState) => void) | null = null;
	private volume = 1;
	private didFadeInForCurrentSound = false;
	private fadeInToken = 0;
	private currentContextId: string | null = null;
	private sleepTimerSelectedMinutesByContext = new Map<string, number>();
	private sleepTimerEndsAt: number | null = null;
	private sleepTimerDurationMs: number | null = null;
	private sleepTimerTimeout: ReturnType<typeof setTimeout> | null = null;
	private sleepTimerToken = 0;
	private sleepTimerFiring = false;
	private sleepTimerContextId: string | null = null;
	private sleepTimerBackgroundRunning = false;

	async load(
		source: AVPlaybackSource,
		onStatusUpdate?: (state: AudioPlayerState) => void,
		options?: { contextId?: string },
	) {
		try {
			this.clearSleepTimer();
			await this.unload();

			this.onStatusUpdate = onStatusUpdate || null;
			this.didFadeInForCurrentSound = false;
			this.currentContextId = options?.contextId ?? null;

			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: true,
				shouldDuckAndroid: true,
			});

			const { sound } = await Audio.Sound.createAsync(
				source,
				{ shouldPlay: false, isLooping: true },
				this.handleStatusUpdate,
			);

			await sound.setProgressUpdateIntervalAsync(1000);
			this.sound = sound;
		} catch (error) {
			console.error("Error loading audio:", error);
			throw error;
		}
	}

	private clearSleepTimerTimeout() {
		if (this.sleepTimerTimeout) {
			(backgroundTimer?.clearTimeout ?? clearTimeout)(this.sleepTimerTimeout);
			this.sleepTimerTimeout = null;
		}
	}

	private startSleepTimerBackgroundLoop() {
		if (!backgroundTimer?.runBackgroundTimer) return;
		if (this.sleepTimerBackgroundRunning) return;
		this.sleepTimerBackgroundRunning = true;
		backgroundTimer.runBackgroundTimer(() => {
			if (this.sleepTimerEndsAt === null) {
				this.stopSleepTimerBackgroundLoop();
				return;
			}
			if (Date.now() >= this.sleepTimerEndsAt) {
				void this.fireSleepTimer(this.sleepTimerToken);
			}
		}, 1000);
	}

	private stopSleepTimerBackgroundLoop() {
		if (!this.sleepTimerBackgroundRunning) return;
		this.sleepTimerBackgroundRunning = false;
		backgroundTimer?.stopBackgroundTimer?.();
	}

	private sleep(ms: number) {
		const safeMs = Math.max(0, Math.floor(ms));
		return new Promise<void>((resolve) => {
			(backgroundTimer?.setTimeout ?? setTimeout)(resolve, safeMs);
		});
	}

	clearSleepTimer() {
		this.sleepTimerToken += 1;
		this.sleepTimerEndsAt = null;
		this.sleepTimerDurationMs = null;
		this.sleepTimerContextId = null;
		this.clearSleepTimerTimeout();
		this.stopSleepTimerBackgroundLoop();
	}

	setSleepTimer(minutes: number, contextId?: string) {
		const resolvedContextId = contextId ?? this.currentContextId ?? "global";
		const safeMinutes = Math.floor(Number(minutes));
		if (Number.isFinite(safeMinutes) && safeMinutes > 0) {
			this.sleepTimerSelectedMinutesByContext.set(
				resolvedContextId,
				safeMinutes,
			);
		}

		if (!this.sound) return;
		if (resolvedContextId !== (this.currentContextId ?? "global")) return;

		if (!Number.isFinite(safeMinutes) || safeMinutes <= 0) {
			this.clearSleepTimer();
			return;
		}

		this.clearSleepTimer();
		this.sleepTimerContextId = resolvedContextId;
		this.sleepTimerDurationMs = safeMinutes * 60 * 1000;
		this.sleepTimerEndsAt = Date.now() + this.sleepTimerDurationMs;
		const token = this.sleepTimerToken;
		const delayMs = Math.max(0, this.sleepTimerEndsAt - Date.now());

		this.sleepTimerTimeout = (backgroundTimer?.setTimeout ?? setTimeout)(() => {
			void this.fireSleepTimer(token);
		}, delayMs);
		this.startSleepTimerBackgroundLoop();
	}

	setSleepTimerSelection(minutes: number, contextId?: string) {
		const resolvedContextId = contextId ?? this.currentContextId ?? "global";
		const safeMinutes = Math.floor(Number(minutes));
		if (!Number.isFinite(safeMinutes) || safeMinutes <= 0) return;
		this.sleepTimerSelectedMinutesByContext.set(resolvedContextId, safeMinutes);
	}

	getSleepTimerSelection(contextId?: string) {
		const resolvedContextId = contextId ?? this.currentContextId ?? "global";
		return (
			this.sleepTimerSelectedMinutesByContext.get(resolvedContextId) ?? null
		);
	}

	getSleepTimerState(contextId?: string) {
		const resolvedContextId = contextId ?? this.currentContextId ?? "global";
		if (
			this.sleepTimerContextId !== resolvedContextId ||
			this.sleepTimerEndsAt === null ||
			this.sleepTimerDurationMs === null
		) {
			return {
				active: false,
				endsAt: null as number | null,
				durationMs: 0,
				remainingMs: 0,
				progress: 0,
			};
		}

		const now = Date.now();
		const durationMs = Math.max(1, this.sleepTimerDurationMs);
		const endsAt = this.sleepTimerEndsAt;
		const remainingMs = Math.max(0, endsAt - now);
		const elapsedMs = Math.min(
			durationMs,
			Math.max(0, durationMs - remainingMs),
		);
		const progress = Math.max(0, Math.min(1, elapsedMs / durationMs));

		return {
			active: remainingMs > 0 && !this.sleepTimerFiring,
			endsAt,
			durationMs,
			remainingMs,
			progress,
		};
	}

	private async fireSleepTimer(token: number) {
		if (this.sleepTimerFiring) return;
		if (this.sleepTimerToken !== token) return;

		this.sleepTimerFiring = true;
		this.sleepTimerEndsAt = null;
		this.sleepTimerDurationMs = null;
		this.clearSleepTimerTimeout();

		try {
			await this.fadeOutAndStop();
		} catch {
		} finally {
			this.sleepTimerFiring = false;
			this.stopSleepTimerBackgroundLoop();
		}
	}

	private async fadeOutAndStop() {
		try {
			const baseVolume = this.getVolume();
			const steps = 14;
			const totalMs = 7000;
			const stepMs = Math.floor(totalMs / steps);

			for (let i = 0; i <= steps; i += 1) {
				const volume = baseVolume * (1 - i / steps);
				await this.setVolume(volume);
				if (stepMs > 0) await this.sleep(stepMs);
			}

			await this.stop();
			await this.setVolume(baseVolume);
		} catch {}
	}

	private handleStatusUpdate = (status: AVPlaybackStatus) => {
		if (!status.isLoaded) {
			this.onStatusUpdate?.({
				isPlaying: false,
				isLoaded: false,
				position: 0,
				duration: 0,
			});
			return;
		}

		this.onStatusUpdate?.({
			isPlaying: status.isPlaying,
			isLoaded: true,
			position: status.positionMillis,
			duration: status.durationMillis || 0,
		});

		if (
			status.isPlaying &&
			this.sleepTimerEndsAt !== null &&
			this.sleepTimerContextId === (this.currentContextId ?? "global") &&
			Date.now() >= this.sleepTimerEndsAt
		) {
			void this.fireSleepTimer(this.sleepTimerToken);
		}
	};

	async play() {
		if (this.sound) {
			await this.sound.playAsync();
		}
	}

	async playWithFadeIn(options?: { durationMs?: number; steps?: number }) {
		if (!this.sound) return;

		if (this.didFadeInForCurrentSound) {
			await this.sound.playAsync();
			return;
		}

		this.didFadeInForCurrentSound = true;
		const token = (this.fadeInToken += 1);
		const steps = Math.max(1, Math.floor(options?.steps ?? 18));
		const durationMs = Math.max(0, Math.floor(options?.durationMs ?? 1400));
		const stepMs = steps > 0 ? Math.floor(durationMs / steps) : durationMs;

		const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

		await this.sound.setVolumeAsync(0);
		await this.sound.playAsync();

		for (let i = 1; i <= steps; i += 1) {
			if (this.fadeInToken !== token) return;
			if (!this.sound) return;
			const target = clamp01(this.volume);
			const next = (i / steps) * target;
			await this.sound.setVolumeAsync(next);
			if (stepMs > 0)
				await new Promise((resolve) => setTimeout(resolve, stepMs));
		}

		if (this.fadeInToken !== token) return;
		if (!this.sound) return;
		await this.sound.setVolumeAsync(clamp01(this.volume));
	}

	async pause() {
		if (this.sound) {
			await this.sound.pauseAsync();
		}
	}

	async stop() {
		if (this.sound) {
			await this.sound.stopAsync();
			await this.sound.setPositionAsync(0);
		}
	}

	async seek(position: number) {
		if (this.sound) {
			await this.sound.setPositionAsync(position);
		}
	}

	async setVolume(volume: number) {
		this.volume = volume;
		if (this.sound) {
			await this.sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
		}
	}

	getVolume() {
		return Math.max(0, Math.min(1, this.volume));
	}

	async unload() {
		if (this.sound) {
			this.fadeInToken += 1;
			await this.sound.unloadAsync();
			this.sound = null;
		}
	}

	async isPlaying(): Promise<boolean> {
		if (this.sound) {
			const status = await this.sound.getStatusAsync();
			return status.isLoaded && status.isPlaying;
		}
		return false;
	}
}

export const audioPlayer = new AudioPlayer();
