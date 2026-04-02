import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { Moon, Settings, Sun } from "lucide-react-native";
import { Modal, Pressable } from "react-native";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

type AppSettingsModalProps = {
	open: boolean;
	onClose: () => void;
};

export default function AppSettingsModal({
	open,
	onClose,
}: AppSettingsModalProps) {
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const setTheme = useThemeStore((state: ThemeState) => state.setTheme);
	const isDark = theme === "dark";
	const t = useTheme();
	const SettingsIcon = Settings as any;
	const SunIcon = Sun as any;
	const MoonIcon = Moon as any;
	const appName = Constants.expoConfig?.name ?? "Jardín Zen";
	const appVersion = Constants.expoConfig?.version ?? "1.0.0";
	const year = "2026";

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
							<SettingsIcon size={24} color={t.text.val} />
						</YStack>
						<Text fontSize={22} fontWeight="800" color="$text" text="center">
							Configuración
						</Text>
						<Text
							fontSize={13}
							color="$textSecondary"
							text="center"
							lineHeight={18}>
							Ajusta la apariencia y revisa los créditos.
						</Text>
					</YStack>

					<YStack width="100%" gap={12}>
						<YStack gap={6}>
							<Text fontSize={14} fontWeight="800" color="$text">
								Tema
							</Text>
							<XStack gap={10}>
								<Button
									flex={1}
									height={44}
									rounded={16}
									backgroundColor="transparent"
									borderWidth={2}
									borderColor={theme === "light" ? "$primary" : "$textMuted"}
									onPress={() => setTheme("light")}>
									<XStack items="center" gap={8}>
										<SunIcon
											size={18}
											color={theme === "light" ? t.primary.val : t.textMuted.val}
										/>
										<Text
											fontSize={14}
											fontWeight="800"
											color={theme === "light" ? "$primary" : "$textMuted"}>
											Claro
										</Text>
									</XStack>
								</Button>
								<Button
									flex={1}
									height={44}
									rounded={16}
									backgroundColor="transparent"
									borderWidth={2}
									borderColor={theme === "dark" ? "$primary" : "$textMuted"}
									onPress={() => setTheme("dark")}>
									<XStack items="center" gap={8}>
										<MoonIcon
											size={18}
											color={theme === "dark" ? t.primary.val : t.textMuted.val}
										/>
										<Text
											fontSize={14}
											fontWeight="800"
											color={theme === "dark" ? "$primary" : "$textMuted"}>
											Oscuro
										</Text>
									</XStack>
								</Button>
							</XStack>
						</YStack>

						<YStack gap={6}>
							<Text fontSize={14} fontWeight="800" color="$text">
								Créditos
							</Text>
							<YStack
								backgroundColor={
									isDark ? "rgba(247,243,245,0.06)" : "rgba(55,63,81,0.06)"
								}
								borderWidth={1}
								borderColor="$border"
								rounded={16}
								p={14}
								gap={6}>
								<Text fontSize={14} fontWeight="800" color="$text">
									{appName}
								</Text>
								<Text fontSize={12} color="$textSecondary">
									Esta app fue creada como un pequeño regalo, por Freddy Tacuri
									con la supervisión de Issac Segarra
								</Text>
								<Text fontSize={12} color="$textSecondary">
									La idea es que siempre tengas un lugar tranquilo donde
									escuchar el sonido del agua, relajarte y desconectar un
									momento.
								</Text>
								<Text fontSize={12} color="$textSecondary">
									Espero que cada vez que la uses te recuerde lo mucho que TE
									AMAMOS. 💗
								</Text>
								<Text fontSize={12} color="$textSecondary">
									Versión {appVersion}
								</Text>
								<Text fontSize={12} color="$textSecondary">
									Hecho con Expo + Tamagui
								</Text>
								<Text fontSize={12} color="$textSecondary">
									© {year}
								</Text>
							</YStack>
						</YStack>
					</YStack>

					<Button
						width="100%"
						height={44}
						rounded={22}
						backgroundColor="$background"
						borderWidth={1}
						borderColor={isDark ? "$border" : "$text"}
						onPress={onClose}>
						<Text
							color={isDark ? "$border" : "$text"}
							fontSize={14}
							fontWeight="800">
							Cerrar
						</Text>
					</Button>
				</YStack>
			</YStack>
		</Modal>
	);
}
