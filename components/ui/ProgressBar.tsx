import { View, ViewProps } from 'react-native';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0 to 100
  height?: number;
  trackColor?: string;
  fillColor?: string;
  className?: string;
}

export const ProgressBar = ({
  progress,
  height = 8,
  trackColor = '#e5e3df',
  fillColor = '#2ead4b',
  className = '',
  ...props
}: ProgressBarProps) => {
  return (
    <View
      className={`rounded-full overflow-hidden ${className}`}
      style={[{ height, backgroundColor: trackColor }, props.style]}
      {...props}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
          backgroundColor: fillColor
        }}
      />
    </View>
  );
};
