import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MockData } from '@/constants/MockData';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { student } = MockData;

  const stats = [
    { label: 'Access Rate', value: student.accessRate, icon: 'eye-outline', color: '#2ead4b' },
    { label: 'Submissions', value: student.submissionRate, icon: 'document-text-outline', color: '#0075de' },
    { label: 'Quiz Avg', value: 85, icon: 'checkmark-done-outline', color: '#dd5b00' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={{ paddingTop: Math.max(insets.top + 10, 42) }} className="px-4 pb-2 bg-[#f5f1ec]">
          <Text className="text-[24px] font-semibold text-[#1a1a1a]">My Progress</Text>
          <Text className="text-[15px] text-[#787671] mt-0.5">Your learning journey at a glance</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap px-4 mt-6 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} className="flex-1 min-w-[30%] items-center justify-center p-4">
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text className="text-[20px] font-bold text-[#1a1a1a]">{stat.value}%</Text>
              <Text className="text-[12px] text-[#787671] text-center">{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Course Progress */}
        <Text className="text-[18px] font-semibold text-[#1a1a1a] px-4 mt-8 mb-4">Course Breakdown</Text>
        <View className="px-4 gap-4">
          {MockData.courses.map(course => (
            <Card key={course.id} className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: course.color }}>
                    <Ionicons name={course.icon as any} size={16} color="#1a1a1a" />
                  </View>
                  <Text className="text-[15px] font-semibold text-[#1a1a1a]">{course.title}</Text>
                </View>
                <Badge label="In Progress" backgroundColor="#edf8f0" textColor="#2ead4b" />
              </View>
              <View className="flex-row items-center gap-4">
                <ProgressBar progress={Math.random() * 100} className="flex-1" />
                <Text className="text-[12px] font-bold text-[#1a1a1a]">{Math.floor(Math.random() * 100)}%</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Recent Achievements */}
        <Text className="text-[18px] font-semibold text-[#1a1a1a] px-4 mt-8 mb-4">Recent Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
           <Card className="w-40 items-center p-4">
             <View className="w-16 h-16 rounded-full bg-[#f5d75e] items-center justify-center mb-3">
               <Ionicons name="flame" size={32} color="#1a1a1a" />
             </View>
             <Text className="text-[14px] font-bold text-[#1a1a1a] text-center">7 Day Streak</Text>
             <Text className="text-[11px] text-[#787671] text-center mt-1">Consistent learner!</Text>
           </Card>
           <Card className="w-40 items-center p-4">
             <View className="w-16 h-16 rounded-full bg-[#edf8f0] items-center justify-center mb-3">
               <Ionicons name="code-working" size={32} color="#2ead4b" />
             </View>
             <Text className="text-[14px] font-bold text-[#1a1a1a] text-center">Code Master</Text>
             <Text className="text-[11px] text-[#787671] text-center mt-1">First unit done!</Text>
           </Card>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
