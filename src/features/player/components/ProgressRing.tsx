import Svg, { Circle } from "react-native-svg";

export default function ProgressRing({
	size,
	strokeWidth,
	progress,
	color,
	trackColor,
}: {
	size: number;
	strokeWidth: number;
	progress: number;
	color: string;
	trackColor: string;
}) {
	const clamped = Math.max(0, Math.min(1, progress));
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const dashOffset = circumference * (1 - clamped);

	return (
		<Svg
			width={size}
			height={size}
			style={
				{
					position: "absolute",
					top: -3,
					left: -(size / 2),
				} as any
			}>
			<Circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={trackColor}
				strokeWidth={strokeWidth}
				fill="transparent"
			/>
			<Circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="transparent"
				strokeDasharray={`${circumference} ${circumference}`}
				strokeDashoffset={dashOffset}
				strokeLinecap="round"
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
			/>
		</Svg>
	);
}
