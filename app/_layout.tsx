import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../src/context/AppProvider";
import colors from "../src/theme/colors";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: colors["background"],
          },
          headerTintColor: colors["text"],
        }}>
          <Stack.Screen
            name="index"
            options={{ title: "Dashboard", headerShown: false }}
          />
          <Stack.Screen
            name="solar"
            options={{ title: "Solar System", headerShown: true }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
