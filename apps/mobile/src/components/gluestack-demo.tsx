import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export function GluestackDemo() {
  const [gluestackValue, setGluestackValue] = useState('');
  const [nativeValue, setNativeValue] = useState('');
  const [gluestackSubmitted, setGluestackSubmitted] = useState<string[]>([]);
  const [nativeSubmitted, setNativeSubmitted] = useState<string[]>([]);

  return (
    <View className="flex-1 p-4 gap-4">
      <Text className="text-white text-3xl font-semibold text-center mb-2">
        NativeWind ✓ Working
      </Text>

      <View className="rounded-lg p-4 gap-2 bg-[#212225]">
        <Text className="text-white text-xl font-semibold mb-1">
          Tailwind via className
        </Text>
        <View className="flex-row gap-2">
          <View className="bg-blue-500 w-10 h-10 rounded-full" />
          <View className="bg-green-500 w-10 h-10 rounded-full" />
          <View className="bg-red-500 w-10 h-10 rounded-full" />
          <View className="bg-yellow-500 w-10 h-10 rounded-full" />
        </View>
        <Text className="text-gray-300 text-sm mt-1">
          These colored circles use className on native {'<View>'}
        </Text>
      </View>

      <ThemedText type="title" style={styles.heading}>
        Gluestack + Native Demo
      </ThemedText>

      <ThemedView type="backgroundSelected" style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Gluestack UI
        </ThemedText>

        <Input variant="outline" size="md" className="mb-2">
          <InputField
            placeholder="Gluestack Input..."
            value={gluestackValue}
            onChangeText={setGluestackValue}
          />
        </Input>

        <Button
          variant="solid"
          size="md"
          action="primary"
          onPress={() => {
            if (gluestackValue.trim()) {
              setGluestackSubmitted((prev) => [...prev, gluestackValue.trim()]);
              setGluestackValue('');
            }
          }}
        >
          <ButtonText>Submit (Gluestack)</ButtonText>
        </Button>

        {gluestackSubmitted.length > 0 && (
          <View style={styles.results}>
            {gluestackSubmitted.map((item, i) => (
              <ThemedText key={i} type="small">{`${i + 1}. ${item}`}</ThemedText>
            ))}
          </View>
        )}
      </ThemedView>

      <ThemedView type="backgroundSelected" style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          React Native (StyleSheet)
        </ThemedText>

        <TextInput
          style={styles.nativeInput}
          placeholder="Native TextInput..."
          placeholderTextColor="#888"
          value={nativeValue}
          onChangeText={setNativeValue}
        />

        <Pressable
          style={({ pressed }) => [
            styles.nativeButton,
            pressed && styles.nativeButtonPressed,
          ]}
          onPress={() => {
            if (nativeValue.trim()) {
              setNativeSubmitted((prev) => [...prev, nativeValue.trim()]);
              setNativeValue('');
            }
          }}
        >
          <Text style={styles.nativeButtonText}>Submit (Native)</Text>
        </Pressable>

        {nativeSubmitted.length > 0 && (
          <View style={styles.results}>
            {nativeSubmitted.map((item, i) => (
              <Text key={i} style={styles.nativeResultItem}>{`${i + 1}. ${item}`}</Text>
            ))}
          </View>
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  section: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    marginBottom: Spacing.one,
  },
  results: {
    marginTop: Spacing.one,
    gap: Spacing.half,
  },
  nativeInput: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    color: '#fff',
    fontSize: 14,
    height: 40,
  },
  nativeButton: {
    backgroundColor: '#3b82f6',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  nativeButtonPressed: {
    backgroundColor: '#2563eb',
  },
  nativeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  nativeResultItem: {
    color: '#fff',
    fontSize: 14,
  },
});
