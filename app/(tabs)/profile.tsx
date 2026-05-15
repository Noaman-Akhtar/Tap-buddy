import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';
import { MockData } from '@/constants/MockData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const student = user || MockData.student;
  
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    { id: 'lang', label: 'Language', value: 'English', icon: 'language-outline' },
    { id: 'school', label: 'School', value: student.school || 'Govt School #1', icon: 'business-outline' },
    { id: 'help', label: 'Help & Support', value: '', icon: 'help-buoy-outline' },
    { id: 'about', label: 'About TAP Buddy', value: 'v1.0.0', icon: 'information-circle-outline' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={{ paddingTop: Math.max(insets.top + 10, 42) }} className="px-4 pb-2 bg-[#f5f1ec]">
          <Text className="text-[24px] font-semibold text-[#1a1a1a]">My Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="px-4 mt-6">
          <Card className="items-center p-8">
            <View className="w-24 h-24 rounded-full bg-[#2ead4b] items-center justify-center mb-4 border-4 border-[#edf8f0]">
               <Text className="text-[32px] font-bold text-white">
                 {student.name.charAt(0)}
               </Text>
            </View>
            <Text className="text-[22px] font-bold text-[#1a1a1a]">{student.name}</Text>
            <Text className="text-[15px] text-[#787671] mt-1">Student ID: {student.id || 'ST123456'}</Text>
            
            <View className="flex-row gap-4 mt-6 w-full">
               <View className="flex-1 items-center border-r border-[#ede9e4]">
                 <Text className="text-[18px] font-bold text-[#1a1a1a]">Grade {student.grade}</Text>
                 <Text className="text-[12px] text-[#787671]">Current Class</Text>
               </View>
               <View className="flex-1 items-center">
                 <Text className="text-[18px] font-bold text-[#1a1a1a]">{student.streak} Days</Text>
                 <Text className="text-[12px] text-[#787671]">Learning Streak</Text>
               </View>
            </View>
          </Card>
        </View>

        {/* Settings Menu */}
        <View className="px-4 mt-8">
          <Text className="text-[14px] font-bold text-[#787671] uppercase tracking-widest mb-4 ml-1">Settings</Text>
          <Card noPadding>
            <View className="flex-row items-center justify-between p-4 border-b border-[#ede9e4]">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-lg bg-blue-50 items-center justify-center mr-3">
                  <Ionicons name="notifications-outline" size={18} color="#0075de" />
                </View>
                <Text className="text-[16px] text-[#1a1a1a] font-medium">Notifications</Text>
              </View>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e3df', true: '#2ead4b' }}
              />
            </View>

            {menuItems.map((item, idx) => (
              <Pressable 
                key={item.id}
                className={`flex-row items-center justify-between p-4 ${idx !== menuItems.length - 1 ? 'border-b border-[#ede9e4]' : ''}`}
              >
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-lg bg-[#f5f1ec] items-center justify-center mr-3">
                    <Ionicons name={item.icon as any} size={18} color="#5d5b54" />
                  </View>
                  <Text className="text-[16px] text-[#1a1a1a] font-medium">{item.label}</Text>
                </View>
                <View className="flex-row items-center">
                  {item.value ? <Text className="text-[14px] text-[#787671] mr-2">{item.value}</Text> : null}
                  <Ionicons name="chevron-forward" size={18} color="#a4a097" />
                </View>
              </Pressable>
            ))}
          </Card>
        </View>

        {/* Logout */}
        <View className="px-4 mt-8">
          <Button 
            title="Log Out" 
            variant="danger" 
            onPress={() => {
              logout();
              router.replace('/(auth)/login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
