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
    setTimeout(() => {
      setLoading(false);
      login({ name: 'Aman', phone, grade: '10', streak: 12, accessRate: 85, submissionRate: 60 });
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
          {/* Logo & title */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#2ead4b', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Ionicons name="school" size={40} color="white" />
            </View>
            <Text style={{ fontSize: 32, fontWeight: '700', color: '#1a1a1a', textAlign: 'center', letterSpacing: -0.5 }}>
              Welcome Back
            </Text>
            <Text style={{ fontSize: 16, color: '#787671', marginTop: 8, textAlign: 'center' }}>
              Enter your phone number to continue your learning journey
            </Text>
          </View>

          {/* Phone input card */}
          <View style={{ backgroundColor: 'white', borderRadius: 16, borderWidth: 1, borderColor: '#e5e3df', padding: 24, marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#5d5b54', marginBottom: 8 }}>Phone Number</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e5e3df', borderRadius: 12, paddingHorizontal: 16, backgroundColor: '#fafaf9' }}>
              <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500', marginRight: 8 }}>+91</Text>
              <TextInput
                style={{ flex: 1, paddingVertical: 16, fontSize: 16, color: '#1a1a1a' }}
                placeholder="00000 00000"
                placeholderTextColor="#a4a097"
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

          <View style={{ marginTop: 32 }}>
            <Text style={{ fontSize: 14, color: '#787671', textAlign: 'center' }}>
              Don't have an account?{' '}
              <Text style={{ color: '#2ead4b', fontWeight: '600' }}>Contact your teacher</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
