import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioPlayerState, audioPlayer } from "src/lib/audio/audio-player";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack } from "tamagui";
import {
	SleepMinutes,
	SleepTimerModal,
} from "../home/components/SleepTimerModal";
import { SoundKey, sounds } from "../home/constants/sounds";

function clamp01(value: number) {
	return Math.max(0, Math.min(1, value));
}

function formatTime(ms: number) {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type TapBarProps = {
	value: number;
	onChange: (value: number) => void;
};

function TapBar({ value, onChange }: TapBarProps) {
	const [width, setWidth] = useState(0);
	const v = clamp01(value);

	return (
		<Pressable
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
			onPress={(e) => {
				if (width <= 0) return;
				const next = clamp01(e.nativeEvent.locationX / width);
				onChange(next);
			}}
			style={{ flex: 1 }}>
			<YStack
				height={6}
				backgroundColor="rgba(255,255,255,0.25)"
				rounded={999}
				overflow="hidden"
				justify="center">
				<YStack
					height="100%"
					width={`${v * 100}%`}
					backgroundColor="rgba(255,255,255,0.9)"
				/>
			</YStack>
			<YStack
				position="absolute"
				l={Math.max(0, width * v - 7)}
				t={-4}
				width={14}
				height={14}
				rounded={7}
				backgroundColor="rgba(255,255,255,0.95)"
			/>
		</Pressable>
	);
}

type PlayerScreenProps = {
	soundKey: SoundKey;
};

export default function PlayerScreen({ soundKey }: PlayerScreenProps) {
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const isDark = theme === "dark";

	const sound = useMemo(
		() => sounds.find((s) => s.key === soundKey),
		[soundKey],
	);

	const [playerState, setPlayerState] = useState<AudioPlayerState>({
		isPlaying: false,
		isLoaded: false,
		position: 0,
		duration: 0,
	});
	const [volume, setVolume] = useState(1);
	const [liked, setLiked] = useState(false);

	const [sleepOpen, setSleepOpen] = useState(false);
	const [sleepMinutes, setSleepMinutes] = useState<SleepMinutes>(30);

	useEffect(() => {
		let cancelled = false;

		const start = async () => {
			if (!sound) {
				router.back();
				return;
			}

			try {
				await audioPlayer.setVolume(1);
				await audioPlayer.load(sound.uri, (state) => {
					if (!cancelled) setPlayerState(state);
				});
				await audioPlayer.play();
			} catch {}
		};

		void start();

		return () => {
			cancelled = true;
			void audioPlayer.unload();
		};
	}, [router, sound]);

	const progress =
		playerState.duration > 0 ? playerState.position / playerState.duration : 0;

	const handleTogglePlay = async () => {
		try {
			if (playerState.isPlaying) await audioPlayer.pause();
			else await audioPlayer.play();
		} catch {}
	};

	const handleSeek = async (ratio: number) => {
		if (playerState.duration <= 0) return;
		try {
			const next = Math.floor(clamp01(ratio) * playerState.duration);
			await audioPlayer.seek(next);
		} catch {}
	};

	const handleChangeVolume = async (next: number) => {
		try {
			const v = clamp01(next);
			setVolume(v);
			await audioPlayer.setVolume(v);
		} catch {}
	};

	const handleBack = async () => {
		try {
			await audioPlayer.stop();
			await audioPlayer.unload();
		} catch {}
		router.back();
	};

	if (!sound) return null;

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
			<Image
				source={{ uri: sound.image }}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				resizeMode="cover"
			/>
			<LinearGradient
				colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.35)", "rgba(0,0,0,0.72)"]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				pointerEvents="none"
			/>

			<YStack flex={1}>
				<XStack px={16} pt={10} items="center" justify="space-between">
					<Button
						width={42}
						height={42}
						rounded={21}
						backgroundColor="rgba(0,0,0,0.28)"
						borderWidth={1}
						borderColor="rgba(255,255,255,0.18)"
						icon={
							<Ionicons
								name="arrow-back"
								size={20}
								width={20}
								height={20}
								color="white"
							/>
						}
						onPress={handleBack}
					/>
					<YStack items="center" flex={1} px={12}>
						<Text
							fontSize={11}
							fontWeight="800"
							letterSpacing={2}
							color="rgba(255,255,255,0.7)"
							textTransform="uppercase"
							text="center">
							AHORA REPRODUCIENDO
						</Text>
						<Text
							fontSize={22}
							fontWeight="800"
							color="white"
							text="center"
							numberOfLines={1}>
							{sound.title}
						</Text>
					</YStack>
					<Button
						width={42}
						height={42}
						rounded={21}
						backgroundColor="rgba(0,0,0,0.28)"
						borderWidth={1}
						borderColor="rgba(255,255,255,0.18)"
						icon={
							<Ionicons
								name={liked ? "heart" : "heart-outline"}
								size={20}
								width={20}
								height={20}
								color="white"
							/>
						}
						onPress={() => setLiked((v) => !v)}
					/>
				</XStack>

				<YStack flex={1} justify="center" items="center">
					<Button
						width={110}
						height={110}
						rounded={55}
						backgroundColor="rgba(255,255,255,0.18)"
						borderWidth={1}
						borderColor="rgba(255,255,255,0.22)"
						pressStyle={{ backgroundColor: "rgba(255,255,255,0.24)" }}
						icon={
							<Ionicons
								name={playerState.isPlaying ? "pause" : "play"}
								size={44}
								color="white"
							/>
						}
						onPress={handleTogglePlay}
					/>
				</YStack>

				<YStack px={20} pb={14} gap={14}>
					<XStack items="center" gap={10}>
						<Text
							fontSize={12}
							color="rgba(255,255,255,0.7)"
							style={{ width: 42 }}>
							{formatTime(playerState.position)}
						</Text>
						<TapBar value={progress} onChange={handleSeek} />
						<Text
							fontSize={12}
							color="rgba(255,255,255,0.7)"
							style={{ width: 42 }}
							text="right">
							{formatTime(playerState.duration)}
						</Text>
					</XStack>
					<XStack items="center" gap={10}>
						<Ionicons
							name="volume-low"
							size={18}
							color="rgba(255,255,255,0.8)"
						/>
						<TapBar value={volume} onChange={handleChangeVolume} />
						<Ionicons
							name="volume-high"
							size={18}
							color="rgba(255,255,255,0.8)"
						/>
					</XStack>

					<XStack gap={12} mt={2}>
						<Button
							height={54}
							rounded={18}
							backgroundColor="rgba(0,0,0,0.28)"
							borderWidth={1}
							borderColor="rgba(255,255,255,0.18)"
							icon={<Ionicons name="time-outline" size={18} color="white" />}
							onPress={() => setSleepOpen(true)}>
							<Text color="white" fontWeight="800">
								{sleepMinutes} min
							</Text>
						</Button>
						<Button
							flex={1}
							height={54}
							rounded={18}
							backgroundColor={isDark ? "$accent" : "$primary"}
							pressStyle={{
								backgroundColor: isDark ? "$accentHover" : "$primaryHover",
							}}
							icon={<Ionicons name="leaf" size={18} color="white" />}
							onPress={() => router.push("/(menu)/home")}>
							<Text color="white" fontWeight="900">
								Cambiar ambiente
							</Text>
						</Button>
					</XStack>

					{/* <XStack
						height={62}
						backgroundColor="rgba(0,0,0,0.35)"
						borderWidth={1}
						borderColor="rgba(255,255,255,0.14)"
						rounded={22}
						px={22}
						items="center"
						justify="space-between">
						<Ionicons name="home" size={22} color="rgba(255,255,255,0.7)" />
						<Ionicons name="leaf" size={22} color="rgba(255,255,255,0.7)" />
						<YStack
							width={44}
							height={44}
							rounded={22}
							backgroundColor="rgba(255,255,255,0.16)"
							borderWidth={1}
							borderColor="rgba(255,255,255,0.18)"
							justify="center"
							items="center">
							<Ionicons name="moon" size={22} color="white" />
						</YStack>
						<Ionicons name="person" size={22} color="rgba(255,255,255,0.7)" />
					</XStack> */}
				</YStack>

				<SleepTimerModal
					open={sleepOpen}
					minutes={sleepMinutes}
					onChangeMinutes={setSleepMinutes}
					onClose={() => setSleepOpen(false)}
				/>
			</YStack>
		</SafeAreaView>
	);
}
