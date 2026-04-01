import MainSection from "@/src/shared/components/MainSection";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { ChevronLeft, Play, Settings } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView } from "react-native";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";
import { SoundKey, sounds } from "../../shared/constants/sounds";
import AppSettingsModal from "./components/AppSettingsModal";

export default function HomeScreen() {
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const t = useTheme();
	const isDark = theme === "dark";
	const [settingsOpen, setSettingsOpen] = useState(false);
	const ChevronLeftIcon = ChevronLeft as any;
	const SettingsIcon = Settings as any;
	const PlayIcon = Play as any;

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
					backgroundColor={isDark ? "#232022" : "#F7F3F5"}
					borderWidth={1}
					borderColor={isDark ? "$border" : "$text"}
					icon={<ChevronLeftIcon size={22} color={t.text.val} />}
					onPress={() => router.back()}
				/>
				<Text fontSize={18} fontWeight="700" color="$text">
					Elige tu sonido
				</Text>
				<Button
					width={40}
					height={40}
					rounded={20}
					backgroundColor={isDark ? "#232022" : "#F7F3F5"}
					borderWidth={1}
					borderColor={isDark ? "$border" : "$text"}
					icon={<SettingsIcon size={20} color={t.text.val} />}
					onPress={() => setSettingsOpen(true)}
				/>
			</XStack>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}>
				<YStack gap={16}>
					{sounds.map((s) => {
						const SoundIcon = s.icon as any;
						return (
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
											<SoundIcon size={22} color={t.primary.val} />
										</YStack>
										<YStack>
											<Text
												fontSize={18}
												fontWeight="700"
												color={isDark ? "$primary" : "$error"}>
												{s.title}
											</Text>
											<Text
												fontSize={12}
												color={isDark ? "$primary" : "$error"}>
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
											<PlayIcon size={16} color="white" />
										</XStack>
									</Button>
								</XStack>
							</YStack>
						);
					})}
				</YStack>
			</ScrollView>
			<AppSettingsModal
				open={settingsOpen}
				onClose={() => setSettingsOpen(false)}
			/>
		</MainSection>
	);
}
