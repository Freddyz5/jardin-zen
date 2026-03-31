import MainSection from "@/src/shared/components/MainSection";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";
import { SoundKey, sounds } from "../../shared/constants/sounds";
import {
	SleepMinutes,
	SleepTimerModal,
} from "../player/components/SleepTimerModal";

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
		<MainSection edges={["top", "bottom"]}>
			<XStack p={16} items="center" justify="space-between">
				<Button
					width={40}
					height={40}
					rounded={20}
					background={isDark ? "#f7f3f514" : "#3840520f"}
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
					background={isDark ? "rgba(247,243,245,0.08)" : "rgba(55,63,81,0.06)"}
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
							<BlurView
								tint={isDark ? "dark" : "light"}
								intensity={60}
								style={{
									position: "absolute",
									left: 0,
									right: 0,
									bottom: 0,
									height: 65,
									backgroundColor: isDark ? "#0000005d" : "#dddddd5d",
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
										backgroundColor={
											theme === "dark" ? "#2e292cff" : "#e2d7e2ff"
										}
										borderWidth={2}
										borderColor="$primaryHover"
										justify="center"
										items="center">
										<Ionicons
											name={s.icon as any}
											size={22}
											color={t.primary.val}
										/>
									</YStack>
									<YStack>
										<Text
											fontSize={18}
											fontWeight="700"
											color={isDark ? "$primary" : "$error"}>
											{s.title}
										</Text>
										<Text fontSize={12} color={isDark ? "$primary" : "$error"}>
											{s.subtitle}
										</Text>
									</YStack>
								</XStack>
								<Button
									height={36}
									px={16}
									rounded={18}
									backgroundColor="$primary"
									pressStyle={{
										backgroundColor: "$primaryHover",
									}}
									shadowColor="$primary"
									onPress={() => handleListen(s.key)}>
									<XStack items="center" gap={8}>
										<Text color="white" fontSize={16} fontWeight="600">
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
			<SleepTimerModal
				open={sleepOpen}
				minutes={sleepMinutes}
				onChangeMinutes={setSleepMinutes}
				onClose={() => setSleepOpen(false)}
				contextId="global"
			/>
		</MainSection>
	);
}
