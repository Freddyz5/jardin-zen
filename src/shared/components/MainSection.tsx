import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { YStack } from "tamagui";

type MainSectionProps = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	edges?: Edge[];
	yStackProps?: Omit<React.ComponentProps<typeof YStack>, "children">;
};

export default function MainSection({
	children,
	style,
	edges,
	yStackProps,
}: MainSectionProps) {
	const theme = useThemeStore((state: ThemeState) => state.theme);

	return (
		<SafeAreaView style={[{ flex: 1 }, style]} edges={edges}>
			<LinearGradient
				colors={
					theme === "dark"
						? ["#232022", "#363134ff", "#232022"]
						: ["#F7F3F5", "#e2d7e2ff", "#F7F3F5"]
				}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
				pointerEvents="none"
			/>
			<YStack {...yStackProps}>{children}</YStack>
		</SafeAreaView>
	);
}
