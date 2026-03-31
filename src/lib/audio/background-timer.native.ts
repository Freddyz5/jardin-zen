let BackgroundTimer: any = null;
try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	BackgroundTimer = require("react-native-background-timer");
} catch {}

export default BackgroundTimer;
