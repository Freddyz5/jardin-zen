import { Audio, AVPlaybackSource, AVPlaybackStatus } from "expo-av";

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

	async load(
		source: AVPlaybackSource,
		onStatusUpdate?: (state: AudioPlayerState) => void,
	) {
		try {
			await this.unload();

			this.onStatusUpdate = onStatusUpdate || null;
			this.didFadeInForCurrentSound = false;

			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
				shouldDuckAndroid: true,
			});

			const { sound } = await Audio.Sound.createAsync(
				source,
				{ shouldPlay: false, isLooping: true },
				this.handleStatusUpdate,
			);

			this.sound = sound;
		} catch (error) {
			console.error("Error loading audio:", error);
			throw error;
		}
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
