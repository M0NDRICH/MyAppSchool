import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { webStyles, mobileStyles } from '@/components/styles/aboutStyles'

import monLogo from '@/assets/images/MONDRICH-Logo.png'
import brcLogo from '@/assets/images/BRC-logo.png'

const explore = () => {
   const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

   const returnIndex = () => {
    router.push('/');
   };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={()=>{returnIndex();}}> 
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Image
          style={styles.monLogo}
          source={monLogo}
          resizeMode='contain'
        />
        <Text style={styles.textDescription}>
          This quiz app is created and developed by MONDRICH for the students or any user who wants to learn about something. With this app you can create your own quiz to enhance learning or to exercise and help you prepare for a upcoming quizzes or exams.
        </Text>
        <Text style={styles.textPrimary}> Special Thanks To: </Text>
        <Image
          style={styles.brcLogo}
          source={brcLogo}
          resizeMode='contain'
        />
      </View>
    </View>
  )
}

export default explore
