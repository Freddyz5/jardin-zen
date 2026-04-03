# Jardín Zen - Proyecto Base

Un proyecto base moderno de React Native + Expo con una arquitectura limpia y escalable.

## Tecnologías del Proyecto

### Core

- **Expo SDK 54** - Framework para desarrollar aplicaciones React Native
- **React Native 0.81** - Framework de desarrollo móvil
- **TypeScript** - Tipado estático para JavaScript

### Navegación

- **Expo Router** - Sistema de navegación basado en archivos
- **React Navigation** - Librería de navegación (dependencia de Expo Router)

### Estado Global

- **Zustand** - Gestión de estado global simple y minimalista

### UI y Estilos

- **React Native StyleSheet** - Sistema de estilos de React Native
- **React Native Reanimated** - Animaciones de alto rendimiento
- **React Native SVG** - Soporte para gráficos SVG

### Funcionalidades Nativas

- **Expo AV** - Reproducción de audio y video
- **Expo Linear Gradient** - Gradientes lineales
- **Expo Blur** - Efectos de desenfoque
- **React Native Safe Area Context** - Manejo del área segura del dispositivo
- **React Native Screens** - Optimización de pantallas nativas

---

## Arquitectura del Proyecto

```
root/
├── app/                          # Rutas de Expo Router
│   ├── _layout.tsx               # Layout raíz
│   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   └── (menu)/                   # Grupo de rutas del menú principal
│       ├── _layout.tsx
│       └── home/
│           └── index.tsx
│
├── src/
│   ├── features/                 # Features específicos del dominio
│   │   └── auth/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── store/
│   │       ├── types/
│   │       └── utils/
│   │
│   ├── shared/                   # Código compartido entre features
│   │   ├── components/
│   │   │   └── ui/              # Componentes UI reutilizables
│   │   ├── hooks/
│   │   ├── store/               # Stores globales (Zustand)
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types/
│   │
│   ├── lib/                     # Configuraciones y librerías
│   │   ├── audio/              # Wrapper de audio
│   │   └── navigation/         # Utilidades de navegación
│   │
│   └── types/                   # Tipos globales
│
├── assets/                      # Recursos estáticos
│   ├── images/
│   ├── sounds/
│   └── fonts/
│
├── app.json                     # Configuración de Expo
├── babel.config.js              # Configuración de Babel
├── metro.config.js              # Configuración de Metro
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias del proyecto
```

---

## Explicación de Carpetas

### `app/`

Contiene las rutas de la aplicación usando **Expo Router**. Cada carpeta representa una ruta en la aplicación. Los grupos de rutas (como `(auth)` y `(menu)`) se usan para organizar rutas relacionadas sin afectar la URL.

### `src/features/`

Contiene código específico de cada feature o módulo del negocio. Cada feature tiene su propia subcarpeta con:

- `components/` - Componentes específicos de la feature
- `hooks/` - Hooks personalizados de la feature
- `services/` - Servicios/API de la feature
- `store/` - Estado local de la feature (Zustand)
- `types/` - Tipos específicos de la feature
- `utils/` - Utilidades de la feature

### `src/shared/`

Contiene código que se comparte entre múltiples features:

- `components/ui/` - Componentes UI reutilizables (botones, inputs, etc.)
- `store/` - Stores globales de Zustand
- `hooks/` - Hooks globales
- `services/` - Servicios compartidos (API, storage, etc.)

### `src/lib/`

Contiene configuraciones de librerías externas:

- `tamagui/` - Configuración y temas de Tamagui
- `audio/` - Wrapper para Expo AV
- `navigation/` - Utilidades de navegación

### `assets/`

Recursos estáticos como imágenes, sonidos y fuentes.

---

## Cómo Correr el Proyecto

### Requisitos Previos

- Node.js 18+
- Bun (gestor de paquetes recomendado) o npm
- Expo CLI

### Instalación

```bash
# Instalar dependencias
bun install

# O con npm
npm install
```

### Ejecutar en Desarrollo

```bash
# Iniciar el servidor de desarrollo
bun start

# O con expo
expo start

# Ejecutar en Android
bun android

# Ejecutar en iOS
bun ios

# Ejecutar en Web
bun web

# Lint
bun lint

# Reset del proyecto (limpia y deja el template listo)
bun reset-project
```

### Scripts disponibles

Los scripts se ejecutan con `bun <script>` .

| Script                       | ¿Para qué sirve?                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `start`                      | Levanta el servidor de desarrollo de Expo (Metro)                                                            |
| `web`                        | Levanta el proyecto en modo web                                                                              |
| `android`                    | Compila y ejecuta la app en Android (proyecto nativo)                                                        |
| `ios`                        | Compila y ejecuta la app en iOS (proyecto nativo)                                                            |
| `lint`                       | Ejecuta el linter usando la configuración de Expo                                                            |
| `reset-project`              | Resetea/limpia el proyecto usando `scripts/reset-project.js`                                                 |
| `prebuild:android`           | Genera/actualiza la carpeta nativa `android/` desde config de Expo (limpia antes)                            |
| `generate:apk:android:debug` | Genera un APK debug local con Gradle (`android/app/build/outputs/apk/debug`)                                 |
| `generate:apk:android`       | Genera un APK release local con Gradle (`android/app/build/outputs/apk/release`)                             |
| `generate:aab:android`       | Genera un AAB release local con Gradle (`android/app/build/outputs/bundle/release`)                          |
| `generate:apk:android:eas`   | Lanza un build de Android en EAS con el perfil `preview`                                                     |
| `generate:aab:android:eas`   | Lanza un build de Android en EAS con el perfil `production`                                                  |
| `prebuild:ios`               | Genera/actualiza la carpeta nativa `ios/` desde config de Expo (limpia antes)                                |
| `generate:apk:ios:debug`     | Intenta generar un artefacto debug desde `ios/` usando Gradle (solo si tu `ios/` tiene un proyecto Gradle)   |
| `generate:apk:ios`           | Intenta generar un artefacto release desde `ios/` usando Gradle (solo si tu `ios/` tiene un proyecto Gradle) |
| `generate:aab:ios`           | Intenta generar un bundle release desde `ios/` usando Gradle (solo si tu `ios/` tiene un proyecto Gradle)    |
| `generate:apk:ios:eas`       | Lanza un build de iOS en EAS con el perfil `preview`                                                         |
| `generate:aab:ios:eas`       | Lanza un build de iOS en EAS con el perfil `production`                                                      |

Notas:

- Para usar los scripts de Gradle de Android necesitas haber generado `android/` (por ejemplo con `bun prebuild:android`) y tener el toolchain de Android configurado.
- Los builds de iOS suelen hacerse con Xcode o con EAS. Los scripts `generate:*:ios:eas` producen artefactos de iOS en EAS, aunque el nombre del script diga `apk/aab`.
- Si usas los scripts `generate:*:ios` (sin `:eas`) asegúrate de que tu carpeta `ios/` realmente soporte Gradle; en proyectos Expo/RN típicos no aplica.

```bash
# Prebuild Android (genera carpeta nativa)
bun prebuild:android

# APK debug (Android)
bun generate:apk:android:debug

# AAB release (Android)
bun generate:aab:android

# Build en EAS (Android)
bun generate:apk:android:eas

# Prebuild iOS (genera carpeta nativa)
bun prebuild:ios

# Build en EAS (iOS)
bun generate:apk:ios:eas
```

---

## Cómo Agregar Nuevas Features

### 1. Crear la estructura de la feature

```bash
mkdir -p src/features/mi-feature/{components,hooks,services,store,types,utils}
```

### 2. Definir los tipos

En `src/features/mi-feature/types/index.ts`:

```typescript
export interface MiEntidad {
	id: string;
	nombre: string;
}
```

### 3. Crear el store (si es necesario)

En `src/features/mi-feature/store/mi-feature.store.ts`:

```typescript
import { create } from "zustand";

interface MiFeatureState {
	entidades: MiEntidad[];
	cargarEntidades: () => Promise<void>;
}

export const useMiFeatureStore = create<MiFeatureState>((set) => ({
	entidades: [],
	cargarEntidades: async () => {
		// Lógica para cargar entidades
	},
}));
```

### 4. Crear componentes

En `src/features/mi-feature/components/MiComponente.tsx`:

```typescript
import { View, Text, StyleSheet } from 'react-native';

export function MiComponente() {
  return (
    <View style={styles.container}>
      <Text>Mi Componente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### 5. Agregar la ruta

Crear el archivo en `app/(menu)/mi-feature/index.tsx`:

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { MiComponente } from '@/features/mi-feature/components/MiComponente';

export default function MiFeatureScreen() {
  return (
    <View style={styles.container}>
      <MiComponente />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

---

## Cómo Funciona Expo Router

Expo Router es un sistema de navegación basado en archivos. Cada archivo en la carpeta `app/` representa una ruta.

### Estructura de Rutas

| Archivo                       | Ruta           |
| ----------------------------- | -------------- |
| `app/index.tsx`               | `/`            |
| `app/(auth)/login.tsx`        | `/login`       |
| `app/(menu)/home/index.tsx`   | `/home`        |
| `app/(menu)/detalle/[id].tsx` | `/detalle/:id` |

### Grupos de Rutas

Los paréntesis en los nombres de carpeta (como `(auth)`) crean grupos de rutas. Esto permite:

- Organizar código relacionado
- Compartir layouts entre rutas
- No afectar la URL

### Layouts

Los archivos `_layout.tsx` definen el layout para un grupo de rutas:

```typescript
import { Stack } from 'expo-router';

export default function MiLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="detalle" />
    </Stack>
  );
}
```

### Navegación

```typescript
import { useRouter } from "expo-router";

const router = useRouter();

// Navegar a una ruta
router.push("/home");

// Navegar hacia atrás
router.back();

// Reemplazar la ruta actual
router.replace("/login");
```

---

## Cómo Funciona Zustand

Zustand es una librería de gestión de estado simple y minimalista.

### Crear un Store

```typescript
import { create } from "zustand";

interface AppState {
	tema: "light" | "dark";
	toggleTema: () => void;
}

export const useAppStore = create<AppState>((set) => ({
	tema: "light",
	toggleTema: () =>
		set((state) => ({
			tema: state.tema === "light" ? "dark" : "light",
		})),
}));
```

### Usar el Store

```typescript
import { useAppStore } from '@/shared/store/app.store';

function MiComponente() {
  const tema = useAppStore((state) => state.tema);
  const toggleTema = useAppStore((state) => state.toggleTema);

  return (
    <button onPress={toggleTema}>
      Tema actual: {tema}
    </button>
  );
}
```

### Beneficios de Zustand

- **Minimalista**: Solo ~1KB
- **Sin boilerplate**: No need for acciones o reducers
- **Flexible**: Funciona con componentes de clase y funcionales
- **Performante**: Actualizaciones selectivas
- **TypeScript**: Completamente tipado

---

## Cómo Funciona React Native Styles

React Native usa un sistema de estilos basado en objetos JavaScript similar a CSS, pero con algunas diferencias importantes.

### Crear Estilos

```typescript
import { View, Text, StyleSheet } from 'react-native';

function MiComponente() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});
```

### Propiedades de Estilo Comunes

- **flex**: Controla cómo se expande el elemento
- **flexDirection**: 'row' o 'column'
- **justifyContent**: Alineación en el eje principal
- **alignItems**: Alineación en el eje secundario
- **padding/margin**: Espaciado interno/externo
- **backgroundColor**: Color de fondo
- **borderRadius**: Radio del borde

### Diferencias con CSS Web

- No hay selectores de clase, siempre usa objetos
- Nombres en camelCase (backgroundColor, no background-color)
- Los valores numéricos sin unidades se interpretan como píxeles
- No existen pseudo-selectores ni media queries (usa useWindowDimensions)

---

## Estructura de Commits

Seguimos el estándar de commits convencionales:

```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: cambios de formato
refactor: refactorización
test: pruebas
chore: mantenimiento
```

Ejemplo:

```
feat(auth): agregar validación de email
fix(login): corregir navegación después del login
docs(readme): actualizar instrucciones de instalación
```

---

## Licencia

MIT
