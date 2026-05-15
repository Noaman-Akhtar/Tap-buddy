import { Pressable, Text, ActivityIndicator } from 'react-native';
import { forwardRef } from 'react';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = forwardRef<any, ButtonProps>(({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  textClassName = '',
}, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#2ead4b] border-[#2ead4b]';
      case 'secondary':
        return 'bg-[#edf8f0] border-[#edf8f0]';
      case 'outline':
        return 'bg-transparent border-[#e5e3df]';
      case 'ghost':
        return 'bg-transparent border-transparent';
      case 'danger':
        return 'bg-[#fde8e8] border-[#fde8e8]';
      default:
        return 'bg-[#2ead4b] border-[#2ead4b]';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return 'text-[#2ead4b]';
      case 'outline':
        return 'text-[#5d5b54]';
      case 'ghost':
        return 'text-[#787671]';
      case 'danger':
        return 'text-[#d03238]';
      default:
        return 'text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 min-h-[32px]';
      case 'md':
        return 'px-4 py-2.5 min-h-[48px]';
      case 'lg':
        return 'px-6 py-4 min-h-[56px]';
      default:
        return 'px-4 py-2.5 min-h-[48px]';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 'text-[13px]';
      case 'md':
        return 'text-[15px]';
      case 'lg':
        return 'text-[17px]';
      default:
        return 'text-[15px]';
    }
  };

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-2xl border ${getVariantStyles()} ${getSizeStyles()} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#2ead4b'} size="small" />
      ) : (
        <Text className={`font-semibold ${getTextStyles()} ${getFontSize()} ${textClassName}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
});
