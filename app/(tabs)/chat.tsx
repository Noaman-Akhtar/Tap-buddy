import {
  View, Text, Pressable, TextInput,
  FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MockData } from '@/constants/MockData';

type Message = { id: string; role: string; content: string; time: string };

const BOT_RESPONSES = [
  "Loops allow you to repeat code multiple times. Think of it like a machine that does the same thing over and over until you tell it to stop.\n\nFor example:\nfor i in range(5):\n    print(i)\n\nThis prints numbers 0 through 4!",
  "Photosynthesis is how plants make food! They absorb sunlight through their leaves, take in carbon dioxide from the air, and absorb water from soil. The result? Glucose (sugar) and oxygen!",
  "In budgeting, the 50-30-20 rule is popular:\n- 50% on needs (rent, food)\n- 30% on wants (games, movies)\n- 20% on savings\n\nIt's a great starting point!",
  "Great question! I can help with Coding, Science, Arts, Dance, or Financial Literacy. Just ask!",
  "Keep going - you're doing amazing! Consistent practice is the key. Every small step counts!",
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(MockData.chatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const responseIndex = useRef(0);
  const insets = useSafeAreaInsets();

  const sendMessage = () => {
    if (!inputText.trim() || isTyping) return;
    const userMsg: Message = {
      id: Date.now().toString(), role: 'user', content: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(), role: 'bot',
        content: BOT_RESPONSES[responseIndex.current % BOT_RESPONSES.length],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      responseIndex.current += 1;
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1800);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View className={`flex-row mb-4 items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-[#2ead4b] items-center justify-center mr-2 mb-0.5">
            <Ionicons name="sparkles" size={14} color="white" />
          </View>
        )}
        {/* Bubble - asymmetric radii via style prop */}
        <View
          style={{
            maxWidth: isUser ? '80%' : '85%',
            backgroundColor: isUser ? '#2ead4b' : '#ffffff',
            borderWidth: isUser ? 0 : 1,
            borderColor: '#e5e3df',
            paddingHorizontal: 16, paddingVertical: 12,
            borderTopLeftRadius: 16, borderTopRightRadius: 16,
            borderBottomLeftRadius: isUser ? 16 : 4,
            borderBottomRightRadius: isUser ? 4 : 16,
          }}
        >
          <Text className={`text-[15px] leading-6 ${isUser ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {item.content}
          </Text>
          <Text
            className={`text-[11px] mt-1.5 ${isUser ? 'text-white/50 text-right' : 'text-[#787671]'}`}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f1ec' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header - dynamic top inset padding for transparent status bars */}
        <View
          style={{ paddingTop: Math.max(insets.top + 10, 42) }}
          className="flex-row items-center px-4 pb-3 bg-white border-b border-[#ede9e4]"
        >
          <View className="w-9 h-9 rounded-full bg-[#2ead4b] items-center justify-center mr-3">
            <Ionicons name="sparkles" size={16} color="white" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[17px] font-semibold text-[#1a1a1a]">TAP Buddy</Text>
              <View className="w-2 h-2 rounded-full bg-[#2ead4b]" />
            </View>
            <Text className="text-[12px] text-[#787671]">AI Learning Tutor</Text>
          </View>
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={18} color="#787671" />
          </Pressable>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          style={{ flex: 1, backgroundColor: '#f5f1ec' }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
            isTyping ? (
              <View className="flex-row items-end mb-4">
                <View className="w-8 h-8 rounded-full bg-[#2ead4b] items-center justify-center mr-2 mb-0.5">
                  <Ionicons name="sparkles" size={14} color="white" />
                </View>
                <View
                  style={{
                    backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e3df',
                    paddingHorizontal: 16, paddingVertical: 12,
                    borderTopLeftRadius: 16, borderTopRightRadius: 16,
                    borderBottomRightRadius: 16, borderBottomLeftRadius: 4,
                  }}
                >
                  <View className="flex-row gap-1">
                    <View className="w-2 h-2 rounded-full bg-[#787671]" />
                    <View className="w-2 h-2 rounded-full bg-[#a4a097]" />
                    <View className="w-2 h-2 rounded-full bg-[#e5e3df]" />
                  </View>
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View className="bg-white border-t border-[#ede9e4] px-4 py-2.5">
          <View className="flex-row items-end bg-white rounded-full border border-[#e5e3df] px-4 min-h-[48px]">
            <TextInput
              className="flex-1 text-[15px] text-[#1a1a1a] py-3 max-h-24"
              placeholder="Ask TAP Buddy anything..."
              placeholderTextColor="#a4a097"
              value={inputText}
              onChangeText={setInputText}
              multiline
              onSubmitEditing={sendMessage}
            />
            {inputText.trim().length === 0 ? (
              <Pressable className="w-10 h-10 items-center justify-center mb-1">
                <Ionicons name="mic-outline" size={22} color="#2ead4b" />
              </Pressable>
            ) : (
              <Pressable className="w-9 h-9 rounded-full bg-[#2ead4b] items-center justify-center mb-1.5" onPress={sendMessage}>
                <Ionicons name="send" size={15} color="white" />
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
