import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useRef } from "react";
import { Modal, Pressable } from "react-native";
import { audioPlayer } from "src/lib/audio/audio-player";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

export type SleepMinutes = 10 | 20 | 30;

interface SleepTimerModalProps {
	open: boolean;
	minutes: SleepMinutes;
	onChangeMinutes: (minutes: SleepMinutes) => void;
	onClose: () => void;
}

export function SleepTimerModal({
	open,
	minutes,
	onChangeMinutes,
	onClose,
}: SleepTimerModalProps) {
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const isDark = theme === "dark";
	const t = useTheme();
	const sleepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearSleepTimer = () => {
		if (sleepTimeoutRef.current) {
			clearTimeout(sleepTimeoutRef.current);
			sleepTimeoutRef.current = null;
		}
	};

	const fadeOutAndStop = async () => {
		try {
			const steps = 14;
			const totalMs = 7000;
			const stepMs = Math.floor(totalMs / steps);

			for (let i = 0; i <= steps; i += 1) {
				const volume = 1 - i / steps;
				await audioPlayer.setVolume(volume);
				await new Promise((resolve) => setTimeout(resolve, stepMs));
			}

			await audioPlayer.stop();
			await audioPlayer.unload();
			await audioPlayer.setVolume(1);
		} catch {}
	};

	const startSleepTimer = (sleepMinutes: number) => {
		clearSleepTimer();
		sleepTimeoutRef.current = setTimeout(
			() => {
				void fadeOutAndStop();
			},
			sleepMinutes * 60 * 1000,
		);
	};

	useEffect(() => {
		return () => {
			clearSleepTimer();
		};
	}, []);

	return (
		<Modal
			transparent
			visible={open}
			animationType="fade"
			onRequestClose={onClose}>
			<YStack flex={1} justify="center" items="center" px={24}>
				<Pressable
					onPress={onClose}
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						backgroundColor: "rgba(0,0,0,0.45)",
					}}
				/>
				<BlurView
					intensity={18}
					tint={isDark ? "dark" : "light"}
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					}}
					pointerEvents="none"
				/>
				<YStack
					width="100%"
					maxW={360}
					backgroundColor={
						isDark ? "rgba(36,59,68,0.96)" : "rgba(255,255,255,0.96)"
					}
					rounded={28}
					p={28}
					borderWidth={1}
					borderColor="$border"
					gap={18}>
					<YStack items="center" gap={10}>
						<YStack
							width={54}
							height={54}
							rounded={27}
							backgroundColor="rgba(255,255,255,0.08)"
							borderWidth={1}
							borderColor="$border"
							justify="center"
							items="center">
							<Ionicons name="moon" size={24} color={t.text.val} />
						</YStack>
						<Text fontSize={22} fontWeight="800" color="$text" text="center">
							Temporizador de Sueño
						</Text>
						<Text
							fontSize={13}
							color="$textSecondary"
							text="center"
							lineHeight={18}>
							El sonido se desvanecerá suavemente al finalizar.
						</Text>
					</YStack>
					<XStack justify="center" gap={16} mt={6}>
						{([10, 20, 30] as const).map((m) => {
							const selected = minutes === m;
							return (
								<Button
									key={m}
									width={76}
									height={76}
									rounded={38}
									backgroundColor={
										selected ? "rgba(255,255,255,0.06)" : "transparent"
									}
									borderWidth={2}
									borderColor={
										selected ? (isDark ? "$accent" : "$primary") : "$border"
									}
									pressStyle={{
										backgroundColor: selected
											? "rgba(255,255,255,0.08)"
											: "rgba(255,255,255,0.04)",
									}}
									onPress={() => onChangeMinutes(m)}>
									<YStack items="center" justify="center" gap={2}>
										<Text fontSize={18} fontWeight="800" color="$text">
											{m}
										</Text>
										<Text
											fontSize={10}
											fontWeight="700"
											color="$textMuted"
											letterSpacing={1}>
											MIN
										</Text>
									</YStack>
								</Button>
							);
						})}
					</XStack>
					<Button
						height={50}
						rounded={25}
						backgroundColor={
							isDark ? "rgba(122, 154, 168, 0.55)" : "rgba(92, 141, 158, 0.85)"
						}
						pressStyle={{
							backgroundColor: isDark
								? "rgba(122, 154, 168, 0.7)"
								: "rgba(92, 141, 158, 0.95)",
						}}
						onPress={() => {
							startSleepTimer(minutes);
							onClose();
						}}>
						<Text color="white" fontSize={16} fontWeight="800">
							Confirmar
						</Text>
					</Button>
					<Button
						height={40}
						rounded={20}
						backgroundColor="transparent"
						pressStyle={{ backgroundColor: "rgba(255,255,255,0.05)" }}
						onPress={onClose}>
						<Text color="$textMuted" fontSize={14} fontWeight="700">
							Cancelar
						</Text>
					</Button>
					<YStack items="center" mt={-4}>
						<YStack
							width={44}
							height={4}
							rounded={2}
							backgroundColor="rgba(255,255,255,0.16)"
						/>
					</YStack>
				</YStack>
			</YStack>
		</Modal>
	);
}
