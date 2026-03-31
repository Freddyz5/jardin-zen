import { useEffect, useMemo, useState } from "react";
import { Pressable } from "react-native";
import { XStack, YStack } from "tamagui";
import { clamp01 } from "../utils/utils";

function hashSeedToUnit(seed: string) {
	let hash = 2166136261;
	for (let i = 0; i < seed.length; i += 1) {
		hash ^= seed.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return ((hash >>> 0) % 1000) / 1000;
}

type WaveformProps = {
	seed: string;
	progress: number;
	isPlaying: boolean;
	onSeek: (ratio: number) => void;
	playedColor: string;
	unplayedColor: string;
};

export default function Waveform({
	seed,
	progress,
	isPlaying,
	onSeek,
	playedColor,
	unplayedColor,
}: WaveformProps) {
	const [width, setWidth] = useState(0);
	const [tick, setTick] = useState(0);

	useEffect(() => {
		if (!isPlaying) return;
		const id = setInterval(() => setTick((t) => t + 1), 120);
		return () => clearInterval(id);
	}, [isPlaying]);

	const bars = useMemo(() => {
		const count = 72;
		const seedUnit = hashSeedToUnit(seed);
		const edge = (i: number) => Math.sin((i / (count - 1)) * Math.PI);

		return Array.from({ length: count }, (_, i) => {
			const phase = (seedUnit * 5 + i * 0.68) % (Math.PI * 2);
			const a = 0.42 + 0.58 * (0.5 + 0.5 * Math.sin(tick * 0.22 + phase));
			const shaped = a * (0.25 + 0.75 * edge(i));
			return clamp01(shaped);
		});
	}, [seed, tick]);

	const playedBars = Math.floor(clamp01(progress) * bars.length);

	const gap = 2;
	const barWidth =
		width > 0
			? Math.max(1, Math.floor((width - gap * (bars.length - 1)) / bars.length))
			: 1;

	return (
		<Pressable
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
			onPress={(e) => {
				if (width <= 0) return;
				const next = clamp01(e.nativeEvent.locationX / width);
				onSeek(next);
			}}>
			<XStack
				height={72}
				items="flex-end"
				justify="space-between"
				overflow="hidden"
				backgroundColor="#00000070"
				rounded={5}>
				{bars.map((v, i) => {
					const h = 10 + Math.round(v * 62);
					const color = i < playedBars ? playedColor : unplayedColor;
					return (
						<YStack
							key={`${seed}-${i}`}
							width={barWidth}
							height={h}
							style={{ backgroundColor: color }}
							rounded={2}
						/>
					);
				})}
			</XStack>
		</Pressable>
	);
}
