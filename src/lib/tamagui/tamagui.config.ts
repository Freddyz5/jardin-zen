import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config/v3';

/**
 * Design Tokens para la app de sonidos de agua y meditación
 * 
 * Colores basados en:
 * - Palo de rosa (#D8A7B1) - color principal favorito
 * - Verde salvia (#8FAF9A) - color accent
 * - Tonos azules lago para modo oscuro
 * 
 * La paleta transmite: calma, naturaleza, romanticismo y suavidad
 * 
 * Extendemos la configuración por defecto de Tamagui
 */

const tamaguiConfig = createTamagui({
  ...config,
  
  // Agregar tokens personalizados
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens.color,
      // Modo claro - Palo de rosa
      primary: '#D8A7B1',
      primaryHover: '#C9969F',
      primaryPressed: '#B8858D',
      
      accent: '#8FAF9A',
      accentHover: '#7A9C85',
      
      background: '#F7F3F5',
      backgroundSecondary: '#EFEBEF',
      
      text: '#2E2A2C',
      textSecondary: '#5A5658',
      textMuted: '#8A8587',
      
      card: '#FFFFFF',
      cardHover: '#FAFAFA',
      
      border: '#E5DADF',
      borderLight: '#F0EBEF',
      
      success: '#6B9B7A',
      error: '#C47B7B',
      warning: '#D4B896',
      info: '#7B9BC4',
      
      overlay: 'rgba(46, 42, 44, 0.5)',
    },
  },
  
  // Temas personalizados
  themes: {
    ...config.themes,
    light: {
      ...config.themes?.light,
      // Sobrescribir colores del tema claro
      primary: '#D8A7B1',
      primaryHover: '#C9969F',
      primaryPressed: '#B8858D',
      
      accent: '#8FAF9A',
      accentHover: '#7A9C85',
      
      background: '#F7F3F5',
      backgroundSecondary: '#EFEBEF',
      
      text: '#2E2A2C',
      textSecondary: '#5A5658',
      textMuted: '#8A8587',
      
      card: '#FFFFFF',
      cardHover: '#FAFAFA',
      
      border: '#E5DADF',
      borderLight: '#F0EBEF',
      
      success: '#6B9B7A',
      error: '#C47B7B',
      warning: '#D4B896',
      info: '#7B9BC4',
      
      overlay: 'rgba(46, 42, 44, 0.5)',
    },
    dark: {
      ...config.themes?.dark,
      // Modo oscuro - Tonos lago
      primary: '#5C8D9E',
      primaryHover: '#4A7A86',
      primaryPressed: '#3D6A72',
      
      accent: '#D8A7B1',
      accentHover: '#E0B5BD',
      
      background: '#1E2F36',
      backgroundSecondary: '#2A3F48',
      
      text: '#F3F4F4',
      textSecondary: '#C4C8C9',
      textMuted: '#8A9091',
      
      card: '#243B44',
      cardHover: '#2D4751',
      
      border: '#2F4A54',
      borderLight: '#3A5963',
      
      success: '#6B9B7A',
      error: '#C47B7B',
      warning: '#D4B896',
      info: '#7B9BC4',
      
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
  },
  
  shouldAddPrefersColorThemes: false,
});

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;
