import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Modal, Pressable, TextInput } from "react-native";
import { audioPlayer } from "src/lib/audio/audio-player";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

export type SleepMinutes = number;

interface SleepTimerModalProps {
	open: boolean;
	minutes: SleepMinutes;
	onChangeMinutes: (minutes: SleepMinutes) => void;
	onConfirm?: (minutes: SleepMinutes) => void;
	onClose: () => void;
	contextId?: string;
}

export function SleepTimerModal({
	open,
	minutes,
	onChangeMinutes,
	onConfirm,
	onClose,
	contextId,
}: SleepTimerModalProps) {
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const isDark = theme === "dark";
	const t = useTheme();
	const presetMinutes = [5, 10, 15, 20, 30] as const;
	const [customOpen, setCustomOpen] = useState(false);
	const [customText, setCustomText] = useState("");

	useEffect(() => {
		if (!open) return;
		setCustomOpen(false);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		if (customOpen) return;
		setCustomText(String(minutes));
	}, [customOpen, minutes, open]);

	const isPreset = presetMinutes.includes(
		minutes as (typeof presetMinutes)[number],
	);
	const customSelected = !isPreset;
	const parsedCustom = Math.floor(Number(customText));
	const customIsValid = Number.isFinite(parsedCustom) && parsedCustom >= 1;
	const normalizedCustom = customIsValid
		? Math.min(240, parsedCustom)
		: minutes;
	const minutesToConfirm = customOpen ? normalizedCustom : minutes;
	const confirmEnabled = !customOpen || customIsValid;

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
						backgroundColor: t.overlay.val,
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
					backgroundColor="$background"
					rounded={28}
					p={28}
					borderWidth={2}
					borderColor="$primaryPressed"
					gap={18}
					items="center">
					<YStack items="center" gap={10}>
						<YStack
							width={54}
							height={54}
							rounded={27}
							backgroundColor={isDark ? "#363134ff" : "#E2D7E2ff"}
							borderWidth={1}
							borderColor="$text"
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
					<XStack justify="center" gap={16} mt={6} flexWrap="wrap" width={280}>
						{presetMinutes.map((m) => {
							const selected = minutes === m;
							return (
								<Button
									key={m}
									width={76}
									height={76}
									rounded={38}
									backgroundColor="transparent"
									borderWidth={2}
									borderColor={selected ? "$primary" : "$textMuted"}
									onPress={() => onChangeMinutes(m)}>
									<YStack items="center" justify="center" gap={2}>
										<Text
											fontSize={18}
											fontWeight="800"
											color={selected ? "$primary" : "$textMuted"}>
											{m}
										</Text>
										<Text
											fontSize={10}
											fontWeight="700"
											color={selected ? "$primary" : "$textMuted"}
											letterSpacing={1}>
											MIN
										</Text>
									</YStack>
								</Button>
							);
						})}
						<Button
							width={76}
							height={76}
							rounded={38}
							backgroundColor="transparent"
							borderWidth={2}
							borderColor={customSelected ? "$primary" : "$textMuted"}
							onPress={() => {
								setCustomOpen(true);
								setCustomText(customSelected ? String(minutes) : "");
							}}>
							<YStack items="center" justify="center" gap={2}>
								<Text
									fontSize={18}
									fontWeight="800"
									color={customSelected ? "$primary" : "$textMuted"}>
									{customSelected ? minutes : "..."}
								</Text>
								<Text
									fontSize={10}
									text="center"
									width="100%"
									fontWeight="700"
									color={customSelected ? "$primary" : "$textMuted"}
									letterSpacing={1}>
									{customSelected ? "MIN" : "CUSTOM"}
								</Text>
							</YStack>
						</Button>
					</XStack>
					{customOpen ? (
						<YStack gap={8}>
							<Text fontSize={13} color="$textSecondary" text="center">
								Minutos personalizados (1–240)
							</Text>
							<TextInput
								value={customText}
								onChangeText={(value) => {
									const next = value.replace(/[^\d]/g, "");
									setCustomText(next);
									const nextParsed = Math.floor(Number(next));
									if (Number.isFinite(nextParsed) && nextParsed >= 1) {
										onChangeMinutes(Math.min(240, nextParsed));
									}
								}}
								keyboardType="number-pad"
								placeholder="Ej: 45"
								placeholderTextColor={t.textMuted.val}
								style={{
									height: 44,
									borderRadius: 12,
									paddingHorizontal: 12,
									borderWidth: 1,
									borderColor: t.border.val,
									color: t.text.val,
									backgroundColor: isDark
										? "rgba(247,243,245,0.06)"
										: "rgba(55,63,81,0.06)",
									textAlign: "center",
									fontSize: 16,
									fontWeight: "700",
								}}
							/>
						</YStack>
					) : null}
					<Button
						width="100%"
						height={50}
						rounded={25}
						backgroundColor="$primary"
						pressStyle={{
							backgroundColor: "$primaryHover",
						}}
						disabled={!confirmEnabled}
						onPress={() => {
							audioPlayer.setSleepTimer(minutesToConfirm, contextId);
							onConfirm?.(minutesToConfirm);
							onClose();
						}}>
						<Text color="white" fontSize={16} fontWeight="800">
							Confirmar
						</Text>
					</Button>
					<Button
						width="100%"
						height={40}
						rounded={20}
						backgroundColor="$background"
						borderWidth={1}
						borderColor={isDark ? "$border" : "$text"}
						onPress={onClose}>
						<Text
							color={isDark ? "$border" : "$text"}
							fontSize={14}
							fontWeight="800">
							Cancelar
						</Text>
					</Button>
				</YStack>
			</YStack>
		</Modal>
	);
}
