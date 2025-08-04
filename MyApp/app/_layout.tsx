import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (

      <><Stack 
      initialRouteName='index'
      screenOptions={{ headerStyle: { backgroundColor: theme.headerBackground }, headerTintColor: theme.text, headerShadowVisible: false }}>
      <Stack.Screen name="quizMenu"    options={{ headerShown: false, title: 'LandPage'}}/>
      <Stack.Screen name="resultQuiz"  options={{ headerShown: false, title: 'resultQuiz'}}/>
      <Stack.Screen name="playQuiz"    options={{ headerShown: false, title: 'PlayQuiz'}}/>
      <Stack.Screen name="addQuiz"     options={{ headerShown: false, title: 'AddQuiz'}}/>
      <Stack.Screen name="index"       options={{ headerShown: false, title: 'index' }} />
      <Stack.Screen name="menu"        options={{ headerShown: true,  title: 'Menu', headerTitle: 'Coffee Shop Menu' }} />
      <Stack.Screen name="about"       options={{ headerShown: false, title: 'About', headerTitle: 'About page' }} />
      <Stack.Screen name="+not-found"  options={{headerShown: false}} />
    </Stack><StatusBar style="auto"/></>
  );
}
