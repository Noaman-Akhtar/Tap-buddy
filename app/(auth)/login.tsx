import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    if (phone.length < 10) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      login({ name: 'Aman', phone, grade: '10' });
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f1ec]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
          <View className="items-center mb-10">
            <View className="w-20 h-20 rounded-full bg-[#2ead4b] items-center justify-center mb-6">
              <Ionicons name="school" size={40} color="white" />
            </View>
            <Text className="text-[32px] font-bold text-[#1a1a1a] tracking-tight text-center">
              Welcome Back
            </Text>
            <Text className="text-[16px] text-[#787671] mt-2 text-center">
              Enter your phone number to continue your learning journey
            </Text>
          </View>

          <View className="bg-white rounded-2xl border border-[#e5e3df] p-6 mb-6">
            <Text className="text-[14px] font-semibold text-[#5d5b54] mb-2">Phone Number</Text>
            <View className="flex-row items-center border border-[#e5e3df] rounded-xl px-4 bg-[#fafaf9]">
              <Text className="text-[16px] text-[#1a1a1a] font-medium mr-2">+91</Text>
              <TextInput
                className="flex-1 py-4 text-[16px] text-[#1a1a1a]"
                placeholder="00000 00000"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <Button 
            title="Login" 
            onPress={handleLogin}
            loading={loading}
            disabled={phone.length < 10}
            size="lg"
          />

          <View className="mt-8">
            <Text className="text-[14px] text-[#787671] text-center">
              Don't have an account?{' '}
              <Text className="text-[#2ead4b] font-semibold">Contact your teacher</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
