import { useThemeStore, ThemeMode } from '../store/theme.store';

/**
 * Hook para acceder y manipular el tema de la aplicación
 * 
 * @example
 * const { theme, toggleTheme, setTheme } = useTheme();
 * 
 * // Obtener el tema actual
 * console.log(theme); // 'light' | 'dark'
 * 
 * // Cambiar tema
 * toggleTheme(); // Cambia entre light y dark
 * setTheme('dark'); // Establece tema oscuro
 */
export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  
  // Funciones helper
  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  
  const setLight = () => setTheme('light');
  const setDark = () => setTheme('dark');
  
  return {
    theme,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
    setLight,
    setDark,
  };
}

export type { ThemeMode };
