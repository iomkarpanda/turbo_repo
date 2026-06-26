import React, { useEffect, useMemo } from 'react';
import { Appearance, View, ViewProps } from 'react-native';
import { config } from './config';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const resolvedMode = useMemo(() => {
    if (mode === 'system') {
      return Appearance.getColorScheme() ?? 'light';
    }
    return mode;
  }, [mode]);

  useEffect(() => {
    Appearance.setColorScheme(mode === 'system' ? null : mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <View
      className="bg-background-0"
      style={[
        config[resolvedMode === 'dark' ? 'dark' : 'light'],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
