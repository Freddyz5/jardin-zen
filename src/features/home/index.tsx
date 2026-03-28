import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";
import { SleepMinutes, SleepTimerModal } from "./components/SleepTimerModal";
import { SoundKey, sounds } from "./constants/sounds";

export default function HomeScreen() {
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const t = useTheme();
	const isDark = theme === "dark";
	const [sleepOpen, setSleepOpen] = useState(false);
	const [sleepMinutes, setSleepMinutes] = useState<SleepMinutes>(20);

	const handleListen = (key: SoundKey) => {
		router.push(`/(menu)/player/${key}`);
	};

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
			<LinearGradient
				colors={
					isDark
						? ["#121A1F", "#1E2F36", "#243943"]
						: ["#F7F3F5", "#EFEBEF", "#EAE6E8"]
				}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				pointerEvents="none"
			/>
			<YStack flex={1} background="$background">
				<XStack p={16} items="center" justify="space-between">
					<Button
						width={40}
						height={40}
						rounded={20}
						background="rgba(255,255,255,0.08)"
						borderWidth={1}
						borderColor="$border"
						icon={
							<Ionicons
								name="chevron-back"
								size={22}
								width={22}
								height={22}
								color={t.text.val}
							/>
						}
						onPress={() => router.back()}
					/>
					<Text fontSize={18} fontWeight="700" color="$text">
						Elige tu sonido
					</Text>
					<Button
						width={40}
						height={40}
						rounded={20}
						background="rgba(255,255,255,0.08)"
						borderWidth={1}
						borderColor="$border"
						icon={
							<Ionicons
								name="settings"
								size={20}
								width={20}
								height={20}
								color={t.text.val}
							/>
						}
						onPress={() => setSleepOpen(true)}
					/>
				</XStack>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
					<YStack gap={16}>
						{sounds.map((s) => (
							<YStack
								key={s.key}
								background="$card"
								rounded={16}
								overflow="hidden"
								shadowColor="$border"
								shadowOpacity={0.2}
								shadowRadius={12}>
								<Image
									source={{ uri: s.image }}
									style={{ width: "100%", height: 160 }}
									resizeMode="cover"
								/>
								<LinearGradient
									colors={
										isDark
											? ["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]
											: ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]
									}
									start={{ x: 0.5, y: 0 }}
									end={{ x: 0.5, y: 1 }}
									style={{
										position: "absolute",
										left: 0,
										right: 0,
										bottom: 0,
										height: 90,
									}}
									pointerEvents="none"
								/>
								<XStack
									position="absolute"
									b={12}
									l={12}
									r={12}
									items="center"
									justify="space-between">
									<XStack items="center" gap={12}>
										<YStack
											width={40}
											height={40}
											rounded={20}
											backgroundColor="#2b2c2cff"
											borderWidth={1}
											borderColor="$border"
											justify="center"
											items="center">
											<Ionicons
												name={s.icon as any}
												size={22}
												color={isDark ? t.accent.val : t.primary.val}
											/>
										</YStack>
										<YStack>
											<Text fontSize={18} fontWeight="700" color="$text">
												{s.title}
											</Text>
											<Text fontSize={12} color="$textSecondary">
												{s.subtitle}
											</Text>
										</YStack>
									</XStack>
									<Button
										height={36}
										px={16}
										rounded={18}
										background={isDark ? "$accent" : "$primary"}
										pressStyle={{
											background: isDark ? "$accentHover" : "$primaryHover",
										}}
										onPress={() => handleListen(s.key)}>
										<XStack items="center" gap={8}>
											<Text color="white" fontSize={14} fontWeight="700">
												Escuchar
											</Text>
											<Ionicons name="play" size={16} color="white" />
										</XStack>
									</Button>
								</XStack>
							</YStack>
						))}
					</YStack>
				</ScrollView>
				{/* <XStack
					position="absolute"
					l={0}
					r={0}
					b={0}
					height={64}
					background="$card"
					borderTopWidth={1}
					borderColor="$border"
					items="center"
					justify="space-around">
					<Ionicons name="home" size={22} color={t.textMuted.val} />
					<YStack
						width={44}
						height={44}
						rounded={22}
						background="rgba(0,0,0,0.25)"
						justify="center"
						items="center"
						borderWidth={1}
						borderColor="$border">
						<Ionicons
							name="musical-notes"
							size={22}
							color={isDark ? t.accent.val : t.primary.val}
						/>
					</YStack>
					<Ionicons name="heart" size={22} color={t.textMuted.val} />
					<Ionicons name="person" size={22} color={t.textMuted.val} />
				</XStack> */}
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
