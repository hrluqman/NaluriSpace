import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
        <Stack.Screen name="solar" options={{ title: "Solar", headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
