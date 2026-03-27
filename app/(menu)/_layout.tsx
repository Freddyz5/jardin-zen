import { Stack } from "expo-router";

export default function MenuLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home" />
			<Stack.Screen name="player/[key]" />
		</Stack>
	);
}
