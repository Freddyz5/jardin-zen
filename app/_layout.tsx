import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../src/lib/tamagui/tamagui.config';
import { useThemeStore } from '../src/shared/store/theme.store';

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(menu)" />
      </Stack>
    </TamaguiProvider>
  );
}
