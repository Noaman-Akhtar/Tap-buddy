import { View, Pressable, ViewProps } from 'react-native';
import { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  variant?: 'white' | 'tinted' | 'outline' | 'clear';
  tintColor?: string;
  noPadding?: boolean;
}

export const Card = ({
  children,
  onPress,
  className = '',
  variant = 'white',
  tintColor,
  noPadding = false,
  ...props
}: CardProps) => {
  const Container = onPress ? Pressable : View;

  const getVariantStyles = () => {
    switch (variant) {
      case 'white':
        return 'bg-white border-[#e5e3df]';
      case 'tinted':
        return 'border-transparent';
      case 'outline':
        return 'bg-transparent border-[#e5e3df]';
      case 'clear':
        return 'bg-transparent border-transparent';
      default:
        return 'bg-white border-[#e5e3df]';
    }
  };

  return (
    <Container
      onPress={onPress}
      className={`rounded-2xl border overflow-hidden ${getVariantStyles()} ${className}`}
      style={[
        variant === 'tinted' && tintColor ? { backgroundColor: tintColor } : {},
        props.style
      ]}
      {...props}
    >
      <View className={noPadding ? '' : 'p-4'}>
        {children}
      </View>
    </Container>
  );
};
