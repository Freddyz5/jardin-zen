import MainSection from "@/src/shared/components/MainSection";
import { useRouter } from "expo-router";
import { ArrowRight, Moon, Sun } from "lucide-react-native";
import React from "react";
import { Image } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { ThemeState, useThemeStore } from "src/shared/store/theme.store";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";

export default function WelcomeScreen() {
	const router = useRouter();
	const theme = useThemeStore((state: ThemeState) => state.theme);
	const toggleTheme = useThemeStore((state: ThemeState) => state.toggleTheme);
	const t = useTheme();
	const SunIcon = Sun as any;
	const MoonIcon = Moon as any;
	const ArrowRightIcon = ArrowRight as any;

	const handleEnter = () => {
		router.push("/(menu)/home");
	};

	return (
		<MainSection
			edges={["top"]}
			yStackProps={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				px: 24,
				py: 48,
			}}>
			<Button
				position="absolute"
				t={48}
				r={24}
				width={44}
				height={44}
				rounded={22}
				backgroundColor={theme === "dark" ? "#232022" : "#F7F3F5"}
				borderWidth={1}
				borderColor={theme === "dark" ? "$border" : "$text"}
				pressStyle={{
					backgroundColor:
						theme === "dark" ? "rgba(247,243,245,0.16)" : "rgba(55,63,81,0.10)",
				}}
				icon={
					theme === "dark" ? (
						<SunIcon size={24} color={t.text.val} />
					) : (
						<MoonIcon size={24} color={t.text.val} />
					)
				}
				onPress={toggleTheme}
				z={10}
			/>

			<YStack position="relative" mb={48} items="center">
				<YStack
					width={260}
					height={260}
					rounded={130}
					borderWidth={4}
					borderColor="$primaryHover"
					overflow="hidden">
					<Image
						source={require("@/assets/images/fountain.png")}
						style={{ width: "100%", height: "100%" }}
						resizeMode="cover"
					/>
				</YStack>
				<YStack
					position="absolute"
					b={-16}
					width={64}
					height={64}
					rounded={32}
					backgroundColor="$backgroundSecondary"
					borderWidth={2}
					borderColor="$primaryHover"
					justify="center"
					items="center">
					<Svg width={50} height={50} viewBox="0 0 512 512">
						<G
							transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
							fill={t.primaryHover.val}
							stroke="none">
							<Path d="M2489 4728 c-227 -162 -450 -419 -570 -656 l-42 -83 -26 18 c-150 99 -319 179 -498 237 -179 57 -198 51 -237 -85 -43 -152 -68 -330 -70 -496 0 -84 -1 -153 -2 -153 -1 0 -41 19 -90 41 -162 75 -401 146 -554 164 -47 6 -59 4 -83 -15 -25 -20 -27 -27 -27 -88 0 -196 63 -477 155 -691 l33 -78 -121 -7 c-177 -10 -316 -37 -339 -66 -10 -12 -18 -31 -18 -42 0 -35 87 -229 152 -338 277 -464 727 -795 1266 -930 l43 -11 -83 -83 c-145 -145 -257 -323 -315 -503 l-27 -83 20 -27 c30 -40 93 -54 275 -60 180 -6 304 9 451 58 93 30 222 90 301 141 26 17 49 29 51 27 1 -2 15 -35 30 -74 55 -138 139 -262 268 -393 119 -121 136 -121 256 0 128 130 205 243 267 393 16 39 30 72 31 74 2 2 30 -13 63 -33 109 -66 250 -127 369 -159 113 -30 124 -31 322 -31 232 1 289 11 324 57 l20 27 -27 83 c-59 180 -171 360 -315 503 l-83 83 43 11 c376 93 725 293 985 564 170 176 301 372 388 577 50 119 53 137 27 169 -23 29 -162 56 -338 66 l-121 7 43 106 c89 219 144 473 144 663 0 61 -2 68 -27 88 -24 19 -36 21 -83 15 -153 -18 -392 -89 -554 -164 -49 -22 -89 -41 -90 -41 -1 0 -2 69 -2 153 -2 166 -27 344 -70 496 -39 136 -58 142 -235 85 -180 -58 -318 -123 -497 -236 l-32 -20 -16 39 c-85 203 -337 509 -552 671 -97 72 -119 76 -183 30z m153 -200 c180 -155 332 -342 424 -522 l55 -109 -42 -43 c-47 -48 -55 -89 -24 -124 34 -38 74 -27 161 46 155 129 362 246 556 313 l87 30 11 -37 c34 -118 52 -273 53 -437 1 -218 -21 -351 -89 -542 -25 -70 -27 -73 -67 -83 -142 -36 -328 -114 -451 -188 -37 -23 -70 -42 -72 -42 -2 0 -22 35 -43 79 -61 120 -170 276 -261 374 l-82 88 56 93 c45 75 56 99 50 120 -13 52 -86 74 -122 38 -11 -11 -36 -47 -57 -80 -21 -34 -40 -62 -42 -62 -2 0 -37 27 -79 60 -51 41 -84 60 -103 60 -27 0 -92 -42 -153 -98 -15 -14 -30 -24 -32 -21 -2 2 -36 53 -76 112 -44 66 -116 154 -186 226 l-115 119 56 109 c62 122 179 283 281 388 80 82 210 195 224 195 5 0 42 -28 82 -62z m-1067 -538 c271 -135 491 -335 639 -579 l48 -80 -82 -88 c-91 -98 -200 -254 -261 -374 -21 -44 -41 -79 -43 -79 -1 0 -41 23 -87 50 -102 61 -262 130 -384 165 -49 14 -93 31 -97 38 -13 22 -68 200 -83 273 -24 121 -37 292 -30 404 7 105 35 293 55 362 l11 37 87 -30 c48 -16 150 -60 227 -99z m-873 -500 c135 -44 357 -155 367 -183 10 -27 70 -242 68 -243 -1 -1 -29 2 -62 7 -33 4 -115 8 -183 8 -118 1 -124 0 -147 -24 -23 -23 -25 -31 -25 -131 0 -93 -2 -105 -16 -100 -9 3 -24 6 -33 6 -13 0 -31 29 -65 99 -80 171 -137 375 -161 573 l-6 56 85 -18 c46 -10 126 -33 178 -50z m3973 18 c-14 -115 -48 -275 -80 -375 -49 -148 -123 -303 -146 -303 -9 0 -24 -3 -33 -6 -14 -5 -16 7 -16 100 0 100 -2 108 -25 131 -23 24 -29 25 -147 24 -68 0 -150 -4 -183 -8 -33 -5 -61 -8 -62 -7 -1 1 10 42 24 91 14 50 30 108 37 130 11 39 16 42 141 105 135 68 273 118 410 150 44 10 81 19 83 19 1 1 0 -23 -3 -51z m-2050 -168 c169 -134 370 -384 455 -564 l38 -79 -105 -101 c-58 -55 -141 -148 -185 -206 -86 -115 -201 -330 -239 -447 -12 -40 -26 -73 -29 -73 -4 0 -14 25 -24 55 -33 105 -64 165 -92 176 -36 13 -75 -1 -94 -34 -14 -25 -13 -33 14 -104 69 -188 108 -366 120 -562 l6 -84 -123 6 c-209 9 -414 61 -614 157 -515 245 -838 740 -879 1344 l-7 109 116 -6 c380 -22 741 -173 1004 -421 51 -48 115 -117 144 -154 69 -88 85 -102 124 -102 39 0 68 29 68 70 0 41 -88 153 -217 278 l-104 99 38 79 c84 178 257 395 439 551 41 35 76 63 79 63 2 0 32 -22 67 -50z m1621 -517 c-41 -604 -364 -1098 -880 -1344 -199 -95 -404 -147 -614 -156 l-122 -6 5 74 c19 239 55 403 124 574 206 502 669 863 1212 944 108 16 126 18 208 20 l74 1 -7 -107z m-3540 -149 c30 -6 31 -7 49 -102 52 -286 190 -577 378 -801 81 -96 78 -97 -83 -16 -365 183 -648 463 -825 815 -25 51 -45 94 -43 95 20 20 428 27 524 9z m4139 5 c50 -6 91 -12 93 -14 2 -2 -18 -45 -44 -96 -172 -344 -467 -635 -823 -813 -161 -81 -164 -80 -92 5 192 227 322 498 383 796 l23 112 55 6 c30 4 62 8 70 9 37 8 254 5 335 -5z m-3173 -1330 c65 -33 208 -86 315 -117 l98 -28 3 -61 3 -61 -48 -35 c-120 -88 -305 -165 -461 -192 -93 -16 -329 -20 -352 -5 -12 7 -6 25 33 104 26 52 73 130 105 173 62 83 226 243 249 243 8 0 32 -9 55 -21z m1934 -61 c108 -103 190 -211 251 -334 39 -79 45 -97 33 -104 -24 -15 -259 -11 -353 5 -156 27 -356 113 -475 203 -32 24 -33 27 -30 85 l3 61 100 28 c99 29 267 92 322 122 15 8 36 15 45 16 9 0 56 -37 104 -82z m-726 -138 c0 -46 -28 -154 -59 -235 -41 -107 -116 -226 -195 -311 l-64 -69 -42 40 c-137 133 -255 364 -275 540 l-7 60 321 0 321 0 0 -25z" />
						</G>
					</Svg>
				</YStack>
			</YStack>

			<YStack items="center" mb={24}>
				<Text fontSize={28} fontWeight="700" color="$text" text="center" mb={8}>
					Bienvenida a tu
				</Text>
				<Text
					fontSize={22}
					fontWeight="600"
					color="$primary"
					text="center"
					fontStyle="italic"
					mb={16}>
					&nbsp;jardín de agua&nbsp;
				</Text>
				<Text
					fontSize={16}
					color="$textSecondary"
					text="center"
					lineHeight={24}
					maxW={300}>
					Un espacio tranquilo y minimalista diseñado para tu bienestar
					interior.
				</Text>
			</YStack>

			<Button
				width="100%"
				maxW={320}
				height={56}
				rounded={28}
				backgroundColor="$primary"
				pressStyle={{
					backgroundColor: "$primaryHover",
				}}
				mt={48}
				shadowColor="$primary"
				shadowOffset={{ width: 0, height: 8 }}
				shadowOpacity={0.3}
				shadowRadius={12}
				elevation={8}
				onPress={handleEnter}>
				<XStack items="center" gap={8}>
					<Text color="white" fontSize={18} fontWeight="600">
						Entrar a la calma
					</Text>
					<ArrowRightIcon size={20} color="white" />
				</XStack>
			</Button>

			<Text
				fontSize={12}
				fontWeight="600"
				color="$textMuted"
				letterSpacing={2}
				textTransform="uppercase"
				mt={32}>
				RESPIRA PROFUNDAMENTE
			</Text>
		</MainSection>
	);
}
