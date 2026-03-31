import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { audioPlayer, AudioPlayerState } from "src/lib/audio/audio-player";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, useTheme, XStack, YStack } from "tamagui";
import { SoundKey, sounds } from "../home/constants/sounds";
import { SleepMinutes, SleepTimerModal } from "./components/SleepTimerModal";
import Waveform from "./components/WaveForm";
import { clamp01, formatTime } from "./utils/utils";

type PlayerScreenProps = {
	soundKey: SoundKey;
};

export default function PlayerScreen({ soundKey }: PlayerScreenProps) {
	const normalizedDefaultVolume = 1;
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const isDark = theme === "dark";
	const t = useTheme();

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
	const [liked, setLiked] = useState(false);

	const [sleepOpen, setSleepOpen] = useState(false);
	const [sleepMinutes, setSleepMinutes] = useState<SleepMinutes>(30);
	const [sleepSelected, setSleepSelected] = useState(false);

	useEffect(() => {
		let cancelled = false;

		const start = async () => {
			if (!sound) {
				router.back();
				return;
			}

			try {
				await audioPlayer.load(sound.source, (state) => {
					if (!cancelled) setPlayerState(state);
				});
				await audioPlayer.setVolume(normalizedDefaultVolume);
				await audioPlayer.playWithFadeIn({ durationMs: 1400, steps: 18 });
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

	const handleBack = async () => {
		try {
			await audioPlayer.stop();
			await audioPlayer.unload();
		} catch {}
		router.back();
	};

	if (!sound) return null;

	const palette = (sound as any).palette;
	const hasPalette =
		!!palette &&
		typeof palette.backgroundColor === "string" &&
		typeof palette.primary === "string" &&
		typeof palette.iconColor === "string";

	const bgColor = hasPalette
		? palette.backgroundColor
		: isDark
			? "#363134ff"
			: "#e2d7e2ff";
	const iconColor = hasPalette ? palette.iconColor : t.text.val;
	const controlsBackground = hasPalette
		? iconColor
		: isDark
			? "#232022"
			: "#F7F3F5";
	const wavePlayed = hasPalette ? palette.primary : t.primary.val;
	const waveUnplayed = hasPalette ? `${palette.primary}50` : t.textMuted.val;
	const playButtons = hasPalette ? palette.primary : t.primary.val;
	const textColor = hasPalette ? "#ffffffe0" : t.text.val;
	const textMuted = hasPalette ? "#ffffff80" : t.textMuted.val;

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={["top"]}>
			<Image
				source={{ uri: sound.image }}
				style={{
					position: "absolute",
					left: -2,
					right: -2,
					top: -2,
					bottom: -2,
					filter: "blur(12px)",
				}}
				resizeMode="cover"
			/>
			{/* <BlurView
				intensity={120}
				tint={isDark ? "dark" : "light"}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
			/> */}
			<YStack flex={1}>
				<XStack px={18} pt={8} items="center" justify="space-between" gap={10}>
					<Button
						width={44}
						height={44}
						rounded={22}
						padding={0}
						backgroundColor="transparent"
						pressStyle={{ backgroundColor: "rgba(255,255,255,0.14)" }}
						icon={<Ionicons name="chevron-back" size={30} color={iconColor} />}
						onPress={handleBack}
					/>
					<XStack items="center" gap={6}>
						<Button
							width={44}
							height={44}
							rounded={22}
							padding={0}
							backgroundColor="transparent"
							pressStyle={{ backgroundColor: "rgba(255,255,255,0.14)" }}
							icon={
								<Ionicons
									name={liked ? "heart" : "heart-outline"}
									size={30}
									color={iconColor}
								/>
							}
							onPress={() => setLiked((v) => !v)}
						/>
					</XStack>
				</XStack>

				<YStack flex={1} justify="center" items="center" px={22} gap={16}>
					<Image
						source={{ uri: sound.image }}
						style={{
							width: 290,
							height: 290,
							borderRadius: 14,
							backgroundColor: isDark ? "#2e292cff" : "#f7f3f5da",
						}}
						resizeMode="cover"
					/>

					<YStack items="center" gap={6} mt={6}>
						<Text
							fontSize={28}
							fontWeight="900"
							style={{ color: textColor }}
							text="center"
							numberOfLines={1}>
							{sound.title}
						</Text>
						<Text
							fontSize={15}
							fontWeight="700"
							style={{ color: textMuted }}
							text="center"
							numberOfLines={1}>
							{sound.subtitle}
						</Text>
					</YStack>

					<YStack width="100%" mt={8}>
						<Waveform
							seed={sound.key}
							progress={progress}
							isPlaying={playerState.isPlaying}
							onSeek={handleSeek}
							playedColor={wavePlayed}
							unplayedColor={waveUnplayed}
						/>
						<XStack mt={10} items="center" justify="space-between">
							<Text fontSize={14} style={{ color: textMuted }}>
								{formatTime(playerState.position)}
							</Text>
							<Text fontSize={14} style={{ color: textMuted }}>
								{formatTime(playerState.duration)}
							</Text>
						</XStack>
					</YStack>
				</YStack>

				<YStack
					px={25}
					paddingVertical={40}
					style={{ backgroundColor: controlsBackground }}>
					<XStack items="center" justify="space-between">
						<Button
							width={48}
							height={48}
							rounded={24}
							padding={0}
							backgroundColor={playButtons}
							pressStyle={{ backgroundColor: "rgba(255,255,255,0.14)" }}
							icon={
								sleepSelected ? undefined : (
									<Ionicons name="moon" size={28} color={iconColor} />
								)
							}
							onPress={() => setSleepOpen(true)}>
							{sleepSelected ? (
								<Text
									style={{ color: iconColor }}
									fontSize={12}
									fontWeight="800">
									{sleepMinutes}m
								</Text>
							) : null}
						</Button>

						<Button
							width={80}
							height={80}
							rounded={43}
							padding={0}
							backgroundColor="transparent"
							borderWidth={4}
							borderColor={playButtons}
							pressStyle={{ backgroundColor: "rgba(255,255,255,0.10)" }}
							icon={
								<Ionicons
									name={playerState.isPlaying ? "pause" : "play"}
									size={40}
									color={playButtons}
								/>
							}
							onPress={handleTogglePlay}
						/>

						<Button
							width={48}
							height={48}
							rounded={24}
							padding={0}
							backgroundColor={playButtons}
							pressStyle={{ backgroundColor: "rgba(255,255,255,0.14)" }}
							icon={<Ionicons name="leaf" size={28} color={iconColor} />}
							onPress={() => router.push("/(menu)/home")}
						/>
					</XStack>
				</YStack>

				<SleepTimerModal
					open={sleepOpen}
					minutes={sleepMinutes}
					onChangeMinutes={(minutes) => {
						setSleepMinutes(minutes);
						setSleepSelected(true);
					}}
					onConfirm={() => setSleepSelected(true)}
					onClose={() => setSleepOpen(false)}
				/>
			</YStack>
		</SafeAreaView>
	);
}
