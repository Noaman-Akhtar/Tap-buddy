import { View, Text, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';

export const SyncBanner = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected]);

  if (isConnected === null || isConnected === true) return null;

  return (
    <Animated.View 
      style={{ transform: [{ translateY: slideAnim }] }}
      className="absolute top-0 left-0 right-0 z-50 bg-[#dd5b00] p-3 flex-row items-center justify-center"
    >
      <Ionicons name="cloud-offline-outline" size={16} color="white" />
      <Text className="text-white text-[13px] font-semibold ml-2">
        You're offline. Changes will sync when you're back.
      </Text>
    </Animated.View>
  );
};
