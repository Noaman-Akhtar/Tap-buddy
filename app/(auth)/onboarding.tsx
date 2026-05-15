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
    <SafeAreaView className="flex-1 bg-[#f5f1ec]">
      <View className="flex-1">
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
        >
          {SLIDES.map((slide) => (
            <View key={slide.id} style={{ width }} className="flex-1 items-center justify-center px-10">
              <View 
                className="w-48 h-48 rounded-full items-center justify-center mb-10"
                style={{ backgroundColor: slide.color }}
              >
                <Ionicons name={slide.icon as any} size={80} color={slide.iconColor} />
              </View>
              <Text className="text-[28px] font-bold text-[#1a1a1a] text-center mb-4 tracking-tight">
                {slide.title}
              </Text>
              <Text className="text-[16px] text-[#787671] text-center leading-6">
                {slide.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View className="px-6 pb-10">
        <View className="flex-row justify-center mb-8 gap-2">
          {SLIDES.map((_, i) => (
            <View 
              key={i} 
              className={`h-2 rounded-full ${i === activeIndex ? 'w-8 bg-[#2ead4b]' : 'w-2 bg-[#e5e3df]'}`} 
            />
          ))}
        </View>

        <View className="flex-row gap-4">
          {activeIndex < SLIDES.length - 1 ? (
            <>
              <Button 
                title="Skip" 
                variant="ghost" 
                onPress={finish}
                className="flex-1"
              />
              <Button 
                title="Next" 
                onPress={handleNext}
                className="flex-[2]"
              />
            </>
          ) : (
            <Button 
              title="Get Started" 
              onPress={finish}
              className="flex-1"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
