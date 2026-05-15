import { View, Pressable, ViewProps, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: 'white' | 'tinted' | 'outline' | 'clear';
  tintColor?: string;
  noPadding?: boolean;
  // className kept for backwards compat but ignored
  className?: string;
}

const VARIANT_STYLE: Record<string, { backgroundColor: string; borderColor: string }> = {
  white:   { backgroundColor: '#ffffff',     borderColor: '#e5e3df' },
  tinted:  { backgroundColor: 'transparent', borderColor: 'transparent' },
  outline: { backgroundColor: 'transparent', borderColor: '#e5e3df' },
  clear:   { backgroundColor: 'transparent', borderColor: 'transparent' },
};

export const Card = ({
  children, onPress,
  variant = 'white', tintColor,
  noPadding = false,
  style,
  ...props
}: CardProps) => {
  const Container = onPress ? Pressable : View;
  const variantStyle = VARIANT_STYLE[variant];

  return (
    <Container
      onPress={onPress as any}
      style={[{
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: variant === 'tinted' && tintColor ? tintColor : variantStyle.backgroundColor,
        borderColor: variantStyle.borderColor,
      } as ViewStyle, style]}
      {...props}
    >
      <View style={noPadding ? undefined : { padding: 16 }}>
        {children}
      </View>
    </Container>
  );
};
