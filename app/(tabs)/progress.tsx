import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MockData } from '@/constants/MockData';

// Fixed progress values — don't use Math.random() in render
const COURSE_PROGRESS: Record<string, number> = {
  c1: 53, c2: 10, c3: 48, c4: 32, c5: 71,
};

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
        <View style={{ paddingTop: Math.max(insets.top + 10, 42), paddingHorizontal: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: '600', color: '#1a1a1a' }}>My Progress</Text>
          <Text style={{ fontSize: 15, color: '#787671', marginTop: 2 }}>Your learning journey at a glance</Text>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 24, gap: 12 }}>
          {stats.map((stat, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#e5e3df',
                padding: 16,
                alignItems: 'center',
              }}
            >
              <View style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: stat.color + '20',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 8,
              }}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1a1a1a' }}>{stat.value}%</Text>
              <Text style={{ fontSize: 12, color: '#787671', textAlign: 'center', marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Course Breakdown */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', paddingHorizontal: 16, marginTop: 32, marginBottom: 16 }}>
          Course Breakdown
        </Text>
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          {MockData.courses.map(course => {
            const progress = COURSE_PROGRESS[course.id] ?? 0;
            return (
              <View
                key={course.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#e5e3df',
                  padding: 16,
                }}
              >
                {/* Icon + name row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 36, height: 36, borderRadius: 18,
                      backgroundColor: course.color,
                      alignItems: 'center', justifyContent: 'center',
                      marginRight: 12,
                    }}>
                      <Ionicons name={course.icon as any} size={18} color="#1a1a1a" />
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#1a1a1a' }}>{course.title}</Text>
                  </View>
                  <Badge label="In Progress" backgroundColor="#edf8f0" textColor="#2ead4b" />
                </View>
                {/* Progress row */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <ProgressBar progress={progress} />
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#1a1a1a', width: 36, textAlign: 'right' }}>
                    {progress}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Recent Achievements */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', paddingHorizontal: 16, marginTop: 32, marginBottom: 16 }}>
          Recent Achievements
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
          {/* Streak badge */}
          <View style={{ width: 160, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e3df', padding: 16, alignItems: 'center' }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#f5d75e', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Ionicons name="flame" size={32} color="#1a1a1a" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1a1a1a', textAlign: 'center' }}>7 Day Streak</Text>
            <Text style={{ fontSize: 11, color: '#787671', textAlign: 'center', marginTop: 4 }}>Consistent learner!</Text>
          </View>
          {/* Code master badge */}
          <View style={{ width: 160, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e3df', padding: 16, alignItems: 'center' }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#edf8f0', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Ionicons name="code-working" size={32} color="#2ead4b" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1a1a1a', textAlign: 'center' }}>Code Master</Text>
            <Text style={{ fontSize: 11, color: '#787671', textAlign: 'center', marginTop: 4 }}>First unit done!</Text>
          </View>
          {/* Quiz ace badge */}
          <View style={{ width: 160, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e3df', padding: 16, alignItems: 'center' }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff3e0', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Ionicons name="trophy" size={32} color="#dd5b00" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1a1a1a', textAlign: 'center' }}>Quiz Ace</Text>
            <Text style={{ fontSize: 11, color: '#787671', textAlign: 'center', marginTop: 4 }}>85% average score!</Text>
          </View>
        </ScrollView>

      </ScrollView>
    </View>
  );
}
