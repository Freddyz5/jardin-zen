import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../src/shared/hooks/useTheme';

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1E2F36' : '#F7F3F5' }]}>
      <View style={styles.content}>
        <Text style={[styles.text, { color: isDark ? '#F3F4F4' : '#2E2A2C' }]}>
          Empezar
        </Text>
        
        <Text style={[styles.themeLabel, { color: isDark ? '#C4C8C9' : '#5A5658' }]}>
          Tema actual: {theme === 'dark' ? 'oscuro' : 'claro'}
        </Text>
        
        <View style={styles.buttonContainer}>
          <Text 
            style={[
              styles.themeButton, 
              { 
                backgroundColor: isDark ? '#5C8D9E' : '#D8A7B1',
                color: isDark ? '#F3F4F4' : '#2E2A2C',
              }
            ]}
            onPress={toggleTheme}
          >
            Cambiar a modo {isDark ? 'claro' : 'oscuro'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
  themeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
