import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, TouchableOpacity, Dimensions, Pressable, Platform } from 'react-native'
import { useRouter, Link } from 'expo-router';
import { webStyles, mobileStyles } from '@/components/styles/indexStyles';

import React from 'react'
import manImg from "@/assets/images/man-pointing.png"
import paperImg from "@/assets/images/paper.png"

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  return (
    <SafeAreaView style={styles.safeContainer} >
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <View style={styles.container}>
       <View style={styles.topPart}>
        <View style={styles.imagePart}>
          <Image
          style={styles.image}
          source={manImg}/>
          <Image
          style={styles.paperImage}
          source={paperImg}/>
        </View>
        <Text style={styles.textTop}>
        Welcome to Application - Your Gateway to Simplicity and Efficiency!
        </Text>
        <Text style={styles.textBottom}>
        Join us today and take the first step towards a smarter, more organized future. Let's make every moment count!
        </Text>
       </View>
       <View style={styles.buttonPart}>
        <Link 
        href="/quizMenu" 
        style={{ marginHorizontal: 'auto' }}
        asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Enter</Text>
        </Pressable>
        </Link>
        <Link 
        href="/about" 
        style={{ marginHorizontal: 'auto' }}
        asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>About</Text>
        </Pressable>
        </Link>

       </View>
      </View>
      <View style={styles.circle3}></View>
      <View style={styles.circle4}></View>
    </SafeAreaView>

  )
}

export default App

