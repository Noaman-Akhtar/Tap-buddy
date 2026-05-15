import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'pill' | 'rect';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  textClassName?: string;
}

export const Badge = ({
  label,
  variant = 'pill',
  backgroundColor = '#edf8f0',
  textColor = '#2ead4b',
  className = '',
  textClassName = '',
}: BadgeProps) => {
  return (
    <View
      className={`px-2.5 py-1 ${variant === 'pill' ? 'rounded-full' : 'rounded-lg'} ${className}`}
      style={{ backgroundColor }}
    >
      <Text
        className={`text-[12px] font-semibold ${textClassName}`}
        style={{ color: textColor }}
      >
        {label}
      </Text>
    </View>
  );
};
