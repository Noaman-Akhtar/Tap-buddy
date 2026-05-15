import { View, Text, ScrollView, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

const MOCK_QUIZ = [
  { id: 1, question: 'What is the correct syntax for a For loop in Python?', options: ['for i in range(5):', 'foreach i in 5:', 'loop(5):', 'for(i=0; i<5; i++)'], correct: 0 },
  { id: 2, question: 'What happens in an infinite loop?', options: ['The code runs once', 'The code never stops', 'The code crashes immediately', 'The code skips the loop'], correct: 1 }
];

export default function ActivityDetailScreen() {
  const { activityId } = useLocalSearchParams();
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      // Mark as accessed/watched in a real app
    }
  }, []);

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          headerTitle: 'Learning Activity',
          headerTitleStyle: { fontWeight: '600', color: '#1a1a1a' },
          headerStyle: { backgroundColor: 'white' },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="ml-2">
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </Pressable>
          )
        }} 
      />

      <ScrollView className="flex-1">
        {/* Video Player Section */}
        <View className="bg-black" style={{ height: (width * 9) / 16 }}>
          <YoutubePlayer
            height={(width * 9) / 16}
            play={playing}
            videoId="h8XerwSkgw4"
            onChangeState={onStateChange}
          />
        </View>

        <View className="p-6">
          <View className="flex-row items-center mb-2">
            <Badge label="Video" backgroundColor="#edf8f0" textColor="#2ead4b" className="mr-2" />
            <Badge label="Coding" variant="rect" />
          </View>
          
          <Text className="text-[22px] font-bold text-[#1a1a1a] mb-2">Introduction to Loops</Text>
          <Text className="text-[15px] text-[#5d5b54] leading-6 mb-8">
            In this video, we explore the concept of loops in programming. You will learn how to automate repetitive tasks and see practical examples in Python.
          </Text>

          <View className="h-[1px] bg-[#ede9e4] mb-8" />

          {/* Quiz Section */}
          <Text className="text-[18px] font-bold text-[#1a1a1a] mb-6">Quick Check</Text>
          
          {MOCK_QUIZ.map((q, qIdx) => (
            <View key={q.id} className="mb-8">
              <Text className="text-[16px] font-semibold text-[#1a1a1a] mb-4">
                {qIdx + 1}. {q.question}
              </Text>
              
              <View className="gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = q.correct === optIdx;
                  
                  let borderColor = '#e5e3df';
                  let bgColor = 'white';
                  
                  if (isSelected) {
                    borderColor = '#2ead4b';
                    bgColor = '#edf8f0';
                  }
                  
                  if (submitted) {
                    if (isCorrect) {
                      borderColor = '#2ead4b';
                      bgColor = '#edf8f0';
                    } else if (isSelected && !isCorrect) {
                      borderColor = '#d03238';
                      bgColor = '#fde8e8';
                    }
                  }

                  return (
                    <Pressable
                      key={optIdx}
                      onPress={() => handleSelectAnswer(q.id, optIdx)}
                      className="flex-row items-center border p-4 rounded-xl"
                      style={{ borderColor, backgroundColor: bgColor }}
                    >
                      <View 
                        className="w-5 h-5 rounded-full border items-center justify-center mr-3"
                        style={{ borderColor: isSelected ? '#2ead4b' : '#a4a097' }}
                      >
                        {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-[#2ead4b]" />}
                      </View>
                      <Text className="text-[15px] text-[#1a1a1a] flex-1">{opt}</Text>
                      {submitted && isCorrect && (
                        <Ionicons name="checkmark-circle" size={20} color="#2ead4b" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <Ionicons name="close-circle" size={20} color="#d03238" />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}

          <Button 
            title={submitted ? "Completed" : "Submit Quiz"} 
            onPress={handleSubmit}
            disabled={submitted || Object.keys(selectedAnswers).length < MOCK_QUIZ.length}
            variant={submitted ? "secondary" : "primary"}
            className="mt-4 mb-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
