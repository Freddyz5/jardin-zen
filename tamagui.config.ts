import { defaultConfig } from "@tamagui/config/v5";
import { animations } from "@tamagui/config/v5-reanimated";
import { createTamagui } from "tamagui";

const config = createTamagui({
	...defaultConfig,
	animations,
	settings: {
		...defaultConfig.settings,
		onlyAllowShorthands: true,
	},
	tokens: {
		...defaultConfig.tokens,
		color: {
			primary: "#D8A7B1",
			primaryHover: "#C9969F",
			primaryPressed: "#B8858D",
			accent: "#8FAF9A",
			accentHover: "#7A9C85",
			background: "#F7F3F5",
			backgroundSecondary: "#EFEBEF",
			text: "#2E2A2C",
			textSecondary: "#5A5658",
			textMuted: "#8A8587",
			card: "#FFFFFF",
			cardHover: "#FAFAFA",
			border: "#E5DADF",
			borderLight: "#F0EBEF",
			success: "#6B9B7A",
			error: "#C47B7B",
			warning: "#D4B896",
			info: "#7B9BC4",
			overlay: "rgba(46, 42, 44, 0.5)",
		},
	},
	themes: {
		...defaultConfig.themes,
		light: {
			...defaultConfig.themes?.light,
			primary: "#D8A7B1",
			primaryHover: "#C9969F",
			primaryPressed: "#B8858D",
			accent: "#8FAF9A",
			accentHover: "#7A9C85",
			background: "#F7F3F5",
			backgroundSecondary: "#EFEBEF",
			text: "#2E2A2C",
			textSecondary: "#5A5658",
			textMuted: "#8A8587",
			card: "#FFFFFF",
			cardHover: "#FAFAFA",
			border: "#E5DADF",
			borderLight: "#F0EBEF",
			success: "#6B9B7A",
			error: "#C47B7B",
			warning: "#D4B896",
			info: "#7B9BC4",
			overlay: "rgba(46, 42, 44, 0.5)",
		},
		dark: {
			...defaultConfig.themes?.dark,
			primary: "#5C8D9E",
			primaryHover: "#4A7A86",
			primaryPressed: "#3D6A72",
			accent: "#D8A7B1",
			accentHover: "#E0B5BD",
			background: "#1E2F36",
			backgroundSecondary: "#2A3F48",
			text: "#F3F4F4",
			textSecondary: "#C4C8C9",
			textMuted: "#8A9091",
			card: "#243B44",
			cardHover: "#2D4751",
			border: "#2F4A54",
			borderLight: "#3A5963",
			success: "#6B9B7A",
			error: "#C47B7B",
			warning: "#D4B896",
			info: "#7B9BC4",
			overlay: "rgba(0, 0, 0, 0.7)",
		},
	},
	shouldAddPrefersColorThemes: false,
});

export default config;
export type AppConfig = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}
