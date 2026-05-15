import { View, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Welcome to TAP Buddy',
    description: 'Learn 21st century skills like Coding, Arts, and Science in a fun way.',
    icon: 'rocket-outline',
    color: '#edf8f0',
    iconColor: '#2ead4b'
  },
  {
    id: 2,
    title: 'AI Learning Tutor',
    description: 'Get help with any topic, any time. Your personal AI tutor is always here.',
    icon: 'sparkles-outline',
    color: '#e3f2fd',
    iconColor: '#0075de'
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description: 'See how much you have learned and earn badges for your achievements.',
    icon: 'trophy-outline',
    color: '#fff3e0',
    iconColor: '#dd5b00'
  }
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const completeOnboarding = useAuthStore(state => state.completeOnboarding);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
      setActiveIndex(activeIndex + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    completeOnboarding();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      {/* Slide area — explicit flex: 1 so it fills space above the footer */}
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'stretch' }}
        >
          {SLIDES.map((slide) => (
            <View
              key={slide.id}
              style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}
            >
              <View
                style={{
                  width: 192, height: 192,
                  borderRadius: 96,
                  backgroundColor: slide.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 40,
                }}
              >
                <Ionicons name={slide.icon as any} size={80} color={slide.iconColor} />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: 16, letterSpacing: -0.5 }}>
                {slide.title}
              </Text>
              <Text style={{ fontSize: 16, color: '#787671', textAlign: 'center', lineHeight: 24 }}>
                {slide.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer — fixed at bottom */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 8 }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                height: 8,
                borderRadius: 4,
                width: i === activeIndex ? 32 : 8,
                backgroundColor: i === activeIndex ? '#2ead4b' : '#e5e3df',
              }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {activeIndex < SLIDES.length - 1 ? (
            <>
              <Button
                title="Skip"
                variant="ghost"
                onPress={finish}
                style={{ flex: 1 }}
              />
              <Button
                title="Next"
                onPress={handleNext}
                style={{ flex: 2 }}
              />
            </>
          ) : (
            <Button
              title="Get Started"
              onPress={finish}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
