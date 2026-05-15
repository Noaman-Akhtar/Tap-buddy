import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { forwardRef } from 'react';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  // kept for backwards compat but ignored
  className?: string;
  textClassName?: string;
}

const VARIANT_BG: Record<string, string> = {
  primary: '#2ead4b', secondary: '#edf8f0',
  outline: 'transparent', ghost: 'transparent', danger: '#fde8e8',
};
const VARIANT_TEXT: Record<string, string> = {
  primary: '#ffffff', secondary: '#2ead4b',
  outline: '#5d5b54', ghost: '#787671', danger: '#d03238',
};
const VARIANT_BORDER: Record<string, string> = {
  primary: '#2ead4b', secondary: '#edf8f0',
  outline: '#e5e3df', ghost: 'transparent', danger: '#fde8e8',
};
const SIZE_PADDING: Record<string, object> = {
  sm: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 32 },
  md: { paddingHorizontal: 16, paddingVertical: 10, minHeight: 48 },
  lg: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 56 },
};
const SIZE_FONT: Record<string, number> = { sm: 13, md: 15, lg: 17 };

export const Button = forwardRef<any, ButtonProps>(({
  onPress, title,
  variant = 'primary', size = 'md',
  loading = false, disabled = false,
  style, textStyle,
}, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled || loading}
      style={[{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        borderRadius: 16, borderWidth: 1,
        backgroundColor: VARIANT_BG[variant],
        borderColor: VARIANT_BORDER[variant],
        opacity: disabled ? 0.5 : 1,
        ...SIZE_PADDING[size],
      }, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#2ead4b'} size="small" />
      ) : (
        <Text style={[{ fontWeight: '600', color: VARIANT_TEXT[variant], fontSize: SIZE_FONT[size] }, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
});
