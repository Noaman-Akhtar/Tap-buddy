import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import "../global.css";
import { useAuthStore } from '@/lib/stores/authStore';

export {
  ErrorBoundary,
} from 'expo-router';

// Start on auth so onboarding shows first without redirect flash
export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [mounted, setMounted] = useState(false);
  const { isLoggedIn, hasFinishedOnboarding } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Wait one frame so the navigator is fully mounted before redirecting
      setTimeout(() => setMounted(true), 0);
    }
  }, [loaded]);

  useEffect(() => {
    if (!mounted) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isLoggedIn && inAuthGroup) {
      // Logged in but still on auth screens → go to tabs
      router.replace('/(tabs)');
    } else if (!isLoggedIn && !inAuthGroup) {
      // Not logged in but somehow on tabs → go to auth
      if (hasFinishedOnboarding) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(auth)/onboarding');
      }
    }
  }, [isLoggedIn, hasFinishedOnboarding, segments, mounted]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
