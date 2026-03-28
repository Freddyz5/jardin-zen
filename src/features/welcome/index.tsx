import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

export default function WelcomeScreen() {
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const toggleTheme = useThemeStore((state: ThemeState) => state.toggleTheme);
	const t = useTheme();

	const handleEnter = () => {
		router.push("/(menu)/home");
	};

	const getThemeIcon = () => {
		return theme === "dark" ? "sunny" : "moon";
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LinearGradient
				colors={
					theme === "dark"
						? ["#0E161B", "#1E2F36", "#2A3F48"]
						: ["#F7F3F5", "#EFEBEF", "#EAE6E8"]
				}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				pointerEvents="none"
			/>
			<YStack flex={1} justify="center" items="center" px={24} py={48}>
				<Button
					position="absolute"
					t={48}
					r={24}
					width={44}
					height={44}
					rounded={22}
					backgroundColor="rgba(255, 255, 255, 0.1)"
					borderWidth={1}
					borderColor="$border"
					pressStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
					icon={
						<Ionicons
							name={getThemeIcon()}
							size={24}
							width={24}
							height={24}
							color={t.text.val}
						/>
					}
					onPress={toggleTheme}
					z={10}
				/>

				<YStack position="relative" mb={48} items="center">
					<YStack
						width={260}
						height={260}
						rounded={130}
						borderWidth={4}
						borderColor="$border"
						overflow="hidden">
						<Image
							source={require("@/assets/images/fountain.png")}
							style={{ width: "100%", height: "100%" }}
							resizeMode="cover"
						/>
					</YStack>
					<YStack
						position="absolute"
						b={-16}
						width={64}
						height={64}
						rounded={32}
						backgroundColor="#2b2c2cff"
						borderWidth={2}
						borderColor="$border"
						justify="center"
						items="center">
						<Ionicons
							name="water"
							size={32}
							color={theme === "dark" ? t.accent.val : t.primary.val}
						/>
					</YStack>
				</YStack>

				<YStack items="center" mb={24}>
					<Text
						fontSize={28}
						fontWeight="700"
						color="$text"
						text="center"
						mb={8}>
						Bienvenida a tu
					</Text>
					<Text
						fontSize={22}
						fontWeight="600"
						color={theme === "dark" ? "$accent" : "$primary"}
						text="center"
						fontStyle="italic"
						mb={16}>
						&nbsp;jardín de agua&nbsp;
					</Text>
					<Text
						fontSize={16}
						color="$textSecondary"
						text="center"
						lineHeight={24}
						maxW={300}>
						Un espacio tranquilo y minimalista diseñado para tu bienestar
						interior.
					</Text>
				</YStack>

				<Button
					width="100%"
					maxW={320}
					height={56}
					rounded={28}
					backgroundColor={theme === "dark" ? "$accent" : "$primary"}
					pressStyle={{
						background: theme === "dark" ? "$accentHover" : "$primaryHover",
					}}
					mt={48}
					shadowColor={theme === "dark" ? "$accent" : "$primary"}
					shadowOffset={{ width: 0, height: 8 }}
					shadowOpacity={0.3}
					shadowRadius={12}
					elevation={8}
					onPress={handleEnter}>
					<XStack items="center" gap={8}>
						<Text color="white" fontSize={18} fontWeight="600">
							Entrar a la calma
						</Text>
						<Ionicons name="arrow-forward" size={20} color="white" />
					</XStack>
				</Button>

				<Text
					fontSize={12}
					fontWeight="600"
					color="$textMuted"
					letterSpacing={2}
					textTransform="uppercase"
					mt={32}>
					RESPIRA PROFUNDAMENTE
				</Text>
			</YStack>
		</SafeAreaView>
	);
}
