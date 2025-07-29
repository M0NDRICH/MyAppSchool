// app/redirect.jsx
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function RedirectScreen() {
  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      router.replace('./index'); // mobile
    } else {
      router.replace('./index'); // web
    }
  }, []);

  return (
    <View>
      <Text>Redirecting...</Text>
    </View>
  );
}
