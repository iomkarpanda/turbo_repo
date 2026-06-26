# Setup

Get the project up and running in minutes.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Quick Start

```bash
# Create a new Expo app
npx create-expo-app@latest superapp

# Move into the project directory
cd superapp
```

## Dependencies

```bash
# Always use npx expo install for Expo packages — it resolves SDK-compatible versions
# and prevents TurboModule/peer-dependency mismatches.
npx expo install nativewind react-native-reanimated react-native-safe-area-context

# Dev tooling
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

# Polyfill Node.js built-ins (react-native-svg imports 'buffer', which is not available
# in the React Native runtime). Install the polyfill and configure Metro to resolve it.
npm install buffer
```

## Metro Configuration

Configure `metro.config.js` to resolve Node.js polyfills and enable NativeWind:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Polyfill Node.js built-ins imported by third-party libraries
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  buffer: require.resolve('buffer/'),
};

module.exports = withNativeWind(config, { input: './global.css' });
```

## Babel Alias Configuration

The `@` alias must resolve to `./src` (matching `tsconfig.json` paths), not `./`. Asset imports need a separate alias.

```js
// babel.config.js
plugins: [
  ['module-resolver', {
    root: ['./'],
    alias: {
      '@/assets': './assets',     // resolves @/assets/... → ./assets/
      '@': './src',               // resolves @/components/... → ./src/components/
      'tailwind.config': './tailwind.config.js',
    },
  }],
  'react-native-worklets/plugin',
],
```

## UI Components — gluestack-ui

```bash
npx gluestack-ui init --path src/components/ui
```

This generates the `gluestack-ui.config.json` configuration file:

```json
{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/global.css"
  },
  "app": {
    "entry": "src/app/_layout.tsx",
    "components": "src/components/ui"
  }
}
```

### Post-Init Fix — Dark Mode on Native

The generated `src/components/ui/gluestack-ui-provider/index.tsx` uses NativeWind's `setColorScheme()`, which guards against non-`class` dark mode strategies. The `darkMode` flag it checks is propagated through Metro's CSS compilation pipeline and can be unreliable on native platforms.

Replace the `setColorScheme` call with React Native's `Appearance.setColorScheme()` directly:

```diff
- import { View, ViewProps } from 'react-native';
+ import { Appearance, View, ViewProps } from 'react-native';
import { useColorScheme } from 'nativewind';

...

- const { colorScheme, setColorScheme } = useColorScheme();
+ const { colorScheme } = useColorScheme();

  useEffect(() => {
-   setColorScheme(mode);
+   Appearance.setColorScheme(mode === 'system' ? null : mode);
  }, [mode]);
```

## Ready

```bash
npx expo start
```

## Troubleshooting

### Metro cache deserialization errors
```
Error: Unable to deserialize cloned data.
```
**Fix:** Run with `--clear` to wipe the stale Metro cache:
```bash
npx expo start --clear
```

### Import resolution errors (wrong path)
```
Unable to resolve "../../components/animated-icon" from "src/app/_layout.tsx"
```
**Fix:** Verify the babel `@` alias in `babel.config.js` matches `tsconfig.json`. The alias value must resolve to the correct source directory (typically `./src`, not `./`).

### TurboModule / peer-dependency version errors
```
TurboModule method "installTurboModule" called with 0 arguments
```
**Fix:** Version mismatches between `react-native-reanimated`, `react-native-worklets`, and other native modules. Run `npx expo install <package>` instead of `npm install <package>` — Expo's installer resolves compatible versions for the current SDK.

### NativeWind dark mode errors
```
Unable to manually set color scheme without using darkMode: class
```
**Fix:** NativeWind's `setColorScheme()` checks a `darkMode` flag that the Metro CSS pipeline may not propagate reliably. Use `Appearance.setColorScheme()` from `react-native` directly (see Post-Init Fix above).
