import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

const MOCK_ACTIVITIES = [
  { id: 'a1', title: 'What is a Loop?', type: 'Video', duration: '5:20', rigor: 'Low', status: 'completed', thumbnail: 'https://img.youtube.com/vi/h8XerwSkgw4/0.jpg' },
  { id: 'a2', title: 'For Loops vs While Loops', type: 'Video', duration: '8:45', rigor: 'Medium', status: 'in-progress', thumbnail: 'https://img.youtube.com/vi/wxds6MAt67U/0.jpg' },
  { id: 'a3', title: 'Loop Practice Quiz', type: 'Quiz', duration: '10 min', rigor: 'Medium', status: 'not-started', thumbnail: 'https://images.unsplash.com/photo-1606326666490-457574d5648f?w=400&h=225&fit=crop' },
  { id: 'a4', title: 'Infinite Loops Project', type: 'Project', duration: '30 min', rigor: 'High', status: 'not-started', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=225&fit=crop' },
];

export default function UnitDetailScreen() {
  const { unitId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f1ec]" edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          headerShown: true, 
          headerTitle: 'Unit Details',
          headerTitleStyle: { fontWeight: '600', color: '#1a1a1a' },
          headerStyle: { backgroundColor: '#f5f1ec' },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="ml-2">
              <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
            </Pressable>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View className="mb-6">
          <Badge label="Coding" variant="rect" className="mb-2 self-start" />
          <Text className="text-[24px] font-bold text-[#1a1a1a] mb-2">Introduction to Loops</Text>
          <Text className="text-[15px] text-[#5d5b54] leading-5 mb-4">
            Learn how to use loops to repeat tasks in your code. We'll cover For loops, While loops and how to avoid infinite loops.
          </Text>
          
          <Card variant="outline" className="flex-row items-center p-3">
             <View className="flex-1 mr-4">
               <View className="flex-row justify-between mb-1.5">
                 <Text className="text-[13px] font-medium text-[#787671]">Overall Progress</Text>
                 <Text className="text-[13px] font-bold text-[#2ead4b]">25%</Text>
               </View>
               <ProgressBar progress={25} />
             </View>
             <View className="w-10 h-10 rounded-full bg-[#2ead4b] items-center justify-center">
               <Ionicons name="trophy" size={20} color="white" />
             </View>
          </Card>
        </View>

        <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-4">Activities</Text>
        
        {MOCK_ACTIVITIES.map((activity, index) => (
          <Card 
            key={activity.id} 
            onPress={() => router.push({ pathname: '/lesson/activity/[activityId]', params: { activityId: activity.id } })}
            noPadding 
            className="mb-4"
          >
            <View className="flex-row">
              <View className="w-32 h-24 bg-[#e5e3df]">
                <Image 
                  source={{ uri: activity.thumbnail }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 items-center justify-center bg-black/10">
                  <Ionicons 
                    name={activity.type === 'Quiz' ? 'help-circle' : 'play-circle'} 
                    size={32} 
                    color="white" 
                  />
                </View>
              </View>
              <View className="flex-1 p-3 justify-center">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-[15px] font-semibold text-[#1a1a1a] flex-1 mr-2" numberOfLines={2}>
                    {activity.title}
                  </Text>
                  {activity.status === 'completed' && (
                    <Ionicons name="checkmark-circle" size={18} color="#2ead4b" />
                  )}
                </View>
                <View className="flex-row items-center">
                  <Text className="text-[12px] text-[#787671]">{activity.type} • {activity.duration}</Text>
                  <View className="w-1 h-1 rounded-full bg-[#787671] mx-2" />
                  <Text className="text-[12px] font-medium" style={{ color: activity.rigor === 'Low' ? '#2ead4b' : activity.rigor === 'Medium' ? '#dd5b00' : '#d03238' }}>
                    {activity.rigor}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
