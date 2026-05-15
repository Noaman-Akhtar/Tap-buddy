import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MockData } from '@/constants/MockData';

export default function HomeScreen() {
  const { student, inProgressUnits, courses } = MockData;
  const insets = useSafeAreaInsets();

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
          {/* Streak Badge - gold bg, pill shape */}
          <View className="flex-row items-center bg-[#f5d75e] px-3 py-1.5 rounded-full">
            <Ionicons name="flame" size={14} color="#1a1a1a" />
            <Text className="text-[12px] font-semibold text-[#1a1a1a] ml-1">{student.streak} day streak</Text>
          </View>
        </View>

        {/* Today's Progress */}
        <View className="mx-4 mt-4 bg-[#edf8f0] rounded-2xl p-4 border border-[#d9f3e1]">
          <View className="flex-row items-center mb-3">
            <Ionicons name="trending-up" size={18} color="#2ead4b" />
            <Text className="text-[15px] font-semibold text-[#2ead4b] ml-2">Today's Progress</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-[12px] font-medium text-[#5d5b54] mb-1.5">Access Rate</Text>
              <View className="h-2 bg-[#e5e3df] rounded-full overflow-hidden">
                <View className="h-full bg-[#2ead4b] rounded-full" style={{ width: `${student.accessRate}%` }} />
              </View>
              <Text className="text-[13px] font-medium text-[#5d5b54] mt-1">{student.accessRate}%</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[12px] font-medium text-[#5d5b54] mb-1.5">Submission Rate</Text>
              <View className="h-2 bg-[#e5e3df] rounded-full overflow-hidden">
                <View className="h-full bg-[#2ead4b] rounded-full" style={{ width: `${student.submissionRate}%` }} />
              </View>
              <Text className="text-[13px] font-medium text-[#5d5b54] mt-1">{student.submissionRate}%</Text>
            </View>
          </View>
        </View>

        {/* Continue Learning */}
        <Text className="text-[20px] font-semibold text-[#1a1a1a] px-4 mt-6 mb-3">Continue Learning</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
          {inProgressUnits.map(unit => (
            <Pressable
              key={unit.id}
              className="w-60 bg-white rounded-2xl border border-[#e5e3df] overflow-hidden"
            >
              <View className="h-1" style={{ backgroundColor: unit.accentColor }} />
              <View className="p-4">
                <View className="self-start px-2 py-0.5 rounded-lg mb-2" style={{ backgroundColor: unit.accentColor }}>
                  <Text className="text-[12px] font-semibold text-[#1a1a1a]">{unit.course}</Text>
                </View>
                <Text className="text-[17px] font-semibold text-[#1a1a1a] mb-3 h-11" numberOfLines={2}>{unit.title}</Text>
                <View className="flex-row items-center gap-2">
                  <View className="flex-1 h-2 bg-[#e5e3df] rounded-full overflow-hidden">
                    <View className="h-full bg-[#2ead4b] rounded-full" style={{ width: `${unit.progress}%` }} />
                  </View>
                  <Text className="text-[12px] font-medium text-[#787671]">{unit.progress}%</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Your Courses */}
        <Text className="text-[20px] font-semibold text-[#1a1a1a] px-4 mt-6 mb-3">Your Courses</Text>
        <View className="flex-row flex-wrap px-4 gap-3">
          {courses.map(course => (
            <Pressable
              key={course.id}
              className="rounded-2xl p-4 items-center justify-center"
              style={{ backgroundColor: course.color, width: '47%', aspectRatio: 1 }}
            >
              <View className="w-14 h-14 rounded-full bg-white/40 items-center justify-center mb-2">
                <Ionicons name={course.icon as any} size={28} color="#1a1a1a" />
              </View>
              <Text className="text-[17px] font-semibold text-[#1a1a1a] text-center">{course.title}</Text>
              <Text className="text-[12px] text-[#5d5b54] text-center mt-0.5" numberOfLines={1}>{course.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Ask TAP Buddy CTA */}
        <Pressable className="mx-4 mt-6 bg-[#2ead4b] rounded-2xl p-4 flex-row items-center min-h-[48px]">
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
