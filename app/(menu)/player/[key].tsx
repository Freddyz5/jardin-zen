import PlayerScreen from "@/src/features/player";
import { SoundKey } from "@/src/shared/constants/sounds";
import { useLocalSearchParams } from "expo-router";

export default function Player() {
	const { key } = useLocalSearchParams<{ key?: string }>();

	if (!key) return null;

	return <PlayerScreen soundKey={key as SoundKey} />;
}
