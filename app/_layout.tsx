import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";
import { useThemeStore } from "../src/shared/store/theme.store";
import config from "../tamagui.config";

export default function RootLayout() {
	const theme = useThemeStore((state) => state.theme) ?? "dark";

	return (
		<SafeAreaProvider>
			<TamaguiProvider config={config} defaultTheme={theme}>
				<Theme name={theme}>
					<StatusBar
						style={theme === "dark" ? "light" : "dark"}
						translucent
						backgroundColor="transparent"
					/>
					<Slot />
				</Theme>
			</TamaguiProvider>
		</SafeAreaProvider>
	);
}
