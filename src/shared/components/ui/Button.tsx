import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'primary':
        return '#4A90A4';
      case 'secondary':
        return '#8B9A46';
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return '#4A90A4';
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'white';
      case 'outline':
      case 'ghost':
        return '#4A90A4';
      default:
        return 'white';
    }
  };

  const getPadding = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: 8, paddingVertical: 4 };
      case 'md':
        return { paddingHorizontal: 16, paddingVertical: 8 };
      case 'lg':
        return { paddingHorizontal: 24, paddingVertical: 12 };
      default:
        return { paddingHorizontal: 16, paddingVertical: 8 };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm':
        return 14;
      case 'md':
        return 16;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          ...getPadding(),
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={{
          color: getTextColor(),
          fontSize: getFontSize(),
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
