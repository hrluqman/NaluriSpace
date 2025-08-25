import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../src/context/AppProvider";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Dashboard", headerShown: false }}
          />
          <Stack.Screen
            name="solar"
            options={{ title: "Solar", headerShown: true }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
