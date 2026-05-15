import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UNITS = [
  { id: 'u1', title: 'Introduction to Loops', course: 'Coding', tint: '#dcecfa', rigor: 'Low', rigorBg: '#edf8f0', rigorFg: '#2ead4b', activities: 4, progress: 25, desc: 'Learn how loops help you repeat code efficiently.' },
  { id: 'u2', title: 'Photosynthesis & Plants', course: 'Science', tint: '#d9f3e1', rigor: 'Medium', rigorBg: '#fff3e0', rigorFg: '#dd5b00', activities: 3, progress: 0, desc: 'Discover how plants make food using sunlight.' },
  { id: 'u3', title: 'Color Theory Basics', course: 'Arts', tint: '#ffe8d4', rigor: 'Low', rigorBg: '#edf8f0', rigorFg: '#2ead4b', activities: 5, progress: 80, desc: 'Understand primary, secondary and complementary colors.' },
  { id: 'u4', title: 'Rhythm & Beat Patterns', course: 'Dance', tint: '#fde0ec', rigor: 'Medium', rigorBg: '#fff3e0', rigorFg: '#dd5b00', activities: 3, progress: 0, desc: 'Explore the fundamentals of rhythm in dance.' },
  { id: 'u5', title: 'Savings & Budgeting', course: 'Financial', tint: '#e6e0f5', rigor: 'High', rigorBg: '#fde8e8', rigorFg: '#d03238', activities: 6, progress: 45, desc: 'Learn to manage money and create a simple budget.' },
];

const FILTERS = ['All', 'Coding', 'Science', 'Arts', 'Dance', 'Financial'];

export default function LearnScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      {/* Header with dynamic top padding for transparent status bars */}
      <View style={{ paddingTop: Math.max(insets.top + 10, 42) }} className="px-4 pb-2 bg-[#f5f1ec]">
        <Text className="text-[24px] font-semibold text-[#1a1a1a]">Learn</Text>
        <Text className="text-[15px] text-[#787671] mt-0.5">Browse your lessons</Text>
      </View>

      {/* Filter pills */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }} className="border-b border-[#ede9e4]">
          {FILTERS.map((f, i) => (
            <Pressable
              key={f}
              className={`px-4 py-2 rounded-full border min-h-[36px] justify-center ${
                i === 0 ? 'bg-[#2ead4b] border-[#2ead4b]' : 'bg-white border-[#e5e3df]'
              }`}
            >
              <Text className={`text-[13px] font-semibold ${i === 0 ? 'text-white' : 'text-[#5d5b54]'}`}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Unit list */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 32 }}>
        {UNITS.map(unit => (
          <Pressable key={unit.id} className="w-full bg-white rounded-2xl border border-[#e5e3df] overflow-hidden">
            <View className="h-1 w-full" style={{ backgroundColor: unit.tint }} />
            <View className="p-4 w-full">
              {/* Badges */}
              <View className="flex-row justify-between items-center mb-2.5">
                <View className="px-2.5 py-1 rounded-lg" style={{ backgroundColor: unit.tint }}>
                  <Text className="text-[12px] font-semibold text-[#1a1a1a]">{unit.course}</Text>
                </View>
                <View className="px-2.5 py-1 rounded-full" style={{ backgroundColor: unit.rigorBg }}>
                  <Text className="text-[12px] font-semibold" style={{ color: unit.rigorFg }}>{unit.rigor} Rigor</Text>
                </View>
              </View>
              {/* Content */}
              <Text className="text-[17px] font-semibold text-[#1a1a1a] mb-1">{unit.title}</Text>
              <Text className="text-[13px] text-[#5d5b54] leading-5 mb-3">{unit.desc}</Text>
              {/* Footer */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="layers-outline" size={14} color="#787671" />
                  <Text className="text-[12px] text-[#787671] ml-1">{unit.activities} activities</Text>
                </View>
                <View className="flex-row items-center flex-1 ml-4 gap-2">
                  <View className="flex-1 h-2 bg-[#e5e3df] rounded-full overflow-hidden">
                    <View className="h-full bg-[#2ead4b] rounded-full" style={{ width: `${unit.progress}%` }} />
                  </View>
                  <Text className="text-[12px] font-medium text-[#787671] w-8 text-right">{unit.progress}%</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
