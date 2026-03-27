import PlayerScreen from "@/src/features/player";
import { useLocalSearchParams } from "expo-router";
import { SoundKey } from "@/src/features/home/constants/sounds";

export default function Player() {
	const { key } = useLocalSearchParams<{ key?: string }>();

	if (!key) return null;

	return <PlayerScreen soundKey={key as SoundKey} />;
}
