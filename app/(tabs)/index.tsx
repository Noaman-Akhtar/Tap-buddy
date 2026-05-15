import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MockData } from '@/constants/MockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAuthStore } from '@/lib/stores/authStore';

export default function HomeScreen() {
  const { inProgressUnits, courses } = MockData;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  // Fallback to mock student if store user is null for some reason
  const student = user || MockData.student;

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header with dynamic top padding for transparent status bars */}
        <View style={{ paddingTop: Math.max(insets.top + 10, 42) }} className="flex-row justify-between items-center px-4 pb-2">
          <View className="flex-1">
            <Text className="text-[28px] font-bold text-[#1a1a1a] tracking-tight">
              Hi, {student.name} 👋
            </Text>
            <Text className="text-[16px] text-[#787671] mt-1">
              Grade {student.grade} - Ready to learn?
            </Text>
          </View>
          
          <Pressable onPress={() => logout()} className="mr-2 p-2">
             <Ionicons name="log-out-outline" size={24} color="#787671" />
          </Pressable>

          <Badge 
            label={`${student.streak} day streak`} 
            backgroundColor="#f5d75e" 
            textColor="#1a1a1a"
            className="px-3 py-1.5"
          />
        </View>

        {/* Today's Progress */}
        <Card variant="tinted" tintColor="#edf8f0" className="mx-4 mt-4 border-[#d9f3e1]">
          <View className="flex-row items-center mb-3">
            <Ionicons name="trending-up" size={18} color="#2ead4b" />
            <Text className="text-[15px] font-semibold text-[#2ead4b] ml-2">Today's Progress</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-[12px] font-medium text-[#5d5b54] mb-1.5">Access Rate</Text>
              <ProgressBar progress={student.accessRate || 65} />
              <Text className="text-[13px] font-medium text-[#5d5b54] mt-1">{student.accessRate || 65}%</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[12px] font-medium text-[#5d5b54] mb-1.5">Submission Rate</Text>
              <ProgressBar progress={student.submissionRate || 40} />
              <Text className="text-[13px] font-medium text-[#5d5b54] mt-1">{student.submissionRate || 40}%</Text>
            </View>
          </View>
        </Card>

        {/* Continue Learning */}
        <Text className="text-[20px] font-semibold text-[#1a1a1a] px-4 mt-6 mb-3">Continue Learning</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
          {inProgressUnits.map(unit => (
            <Card 
              key={unit.id} 
              onPress={() => router.push({ pathname: '/lesson/[unitId]', params: { unitId: unit.id } })}
              className="w-64"
              noPadding
            >
              <View className="h-1" style={{ backgroundColor: unit.accentColor }} />
              <View className="p-4">
                <Badge 
                  label={unit.course} 
                  backgroundColor={unit.accentColor} 
                  textColor="#1a1a1a"
                  variant="rect"
                  className="mb-2 self-start"
                />
                <Text className="text-[17px] font-semibold text-[#1a1a1a] mb-3 h-11" numberOfLines={2}>{unit.title}</Text>
                <View className="flex-row items-center gap-2">
                  <ProgressBar progress={unit.progress} className="flex-1" />
                  <Text className="text-[12px] font-medium text-[#787671]">{unit.progress}%</Text>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>

        {/* Your Courses */}
        <Text className="text-[20px] font-semibold text-[#1a1a1a] px-4 mt-6 mb-3">Your Courses</Text>
        <View className="flex-row flex-wrap px-4 gap-3">
          {courses.map(course => (
            <Card
              key={course.id}
              onPress={() => router.push('/(tabs)/learn')}
              variant="tinted"
              tintColor={course.color}
              className="items-center justify-center"
              style={{ width: '47%', aspectRatio: 1 }}
            >
              <View className="w-14 h-14 rounded-full bg-white/40 items-center justify-center mb-2">
                <Ionicons name={course.icon as any} size={28} color="#1a1a1a" />
              </View>
              <Text className="text-[17px] font-semibold text-[#1a1a1a] text-center">{course.title}</Text>
              <Text className="text-[12px] text-[#5d5b54] text-center mt-0.5" numberOfLines={1}>{course.label}</Text>
            </Card>
          ))}
        </View>

        {/* Ask TAP Buddy CTA */}
        <Pressable 
          onPress={() => router.push('/(tabs)/chat')}
          className="mx-4 mt-6 bg-[#2ead4b] rounded-2xl p-4 flex-row items-center min-h-[48px]"
        >
          <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
            <Ionicons name="chatbubble-ellipses" size={20} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-white">Ask TAP Buddy</Text>
            <Text className="text-[13px] text-white/70">Get help with any topic</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </Pressable>

      </ScrollView>
    </View>
  );
}

