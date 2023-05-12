import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import './config/Firebase';
import { createTheme, ThemeProvider } from "@rneui/themed";
import RootNavigation from "./navigation";
import { useFonts } from 'expo-font';
import { View } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const theme = createTheme({
  lightColors: {
    primary: "#e1f5e7",
  },
  darkColors: {
    primary: "#507c66",
    secondary: "#39423e",
    background: '#f8f2d4'
  },
  mode: "dark",
  screenContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});


export default function App() {

  const [fontsLoaded] = useFonts({
    "Kalam-Regular": require('./assets/fonts/Kalam-Regular.ttf'),
    "Kalam-Bold": require('./assets/fonts/Kalam-Bold.ttf'),
    "Kalam-Light": require('./assets/fonts/Kalam-Light.ttf'),
    "KleeOne-Regular": require('./assets/fonts/KleeOne-Regular.ttf'),
    "KleeOne-SemiBold": require('./assets/fonts/KleeOne-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <ThemeProvider theme={theme} >
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <RootNavigation />
      </View>
    </ThemeProvider>
  );
}