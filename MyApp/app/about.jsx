import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import monLogo from '@/assets/images/MONDRICH-Logo.png'
import brcLogo from '@/assets/images/BRC-logo.png'

const explore = () => {
   const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  return (
    <View style={styles.container}>
      <Link
      href="/"
      asChild
      >
        <TouchableOpacity style={styles.backButton}> 
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </Link>
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

const webStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF1D5',
  },
  card: {
    width: '50%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textDescription: {
    textAlign: 'center',
    textIndent: 0,
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#9EC6F3',
    width: 125,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  textPrimary: {
    color: '#3C2F60',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

const mobileStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF1D5',
  },
  card: {
    marginTop: 20,
    width: '100%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  monLogo: {
    width: 200,
    height: 80
  },
  brcLogo: {
    width: 300,
    height: 150,
  },
  textPrimary: {
    color: '#3C2F60',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textDescription: {
    paddingHorizontal: 20,
    textAlign: 'center',
    textIndent: 0,
    color: '#3C2F60',
    fontWeight: '500',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#9EC6F3',
    width: 125,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});