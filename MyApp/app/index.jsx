import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, TouchableOpacity, Dimensions, Pressable, Platform } from 'react-native'
import { useRouter, Link } from 'expo-router';

import React from 'react'
import icedCoffeeImg from "@/assets/images/iced-coffee.png"
import manImg from "@/assets/images/man-pointing.png"
import paperImg from "@/assets/images/paper.png"

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const app = () => {
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
        href="/contact" 
        style={{ marginHorizontal: 'auto' }}
        asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </Pressable>
        </Link>

       </View>
      </View>
      <View style={styles.circle3}></View>
      <View style={styles.circle4}></View>
    </SafeAreaView>

  )
}

export default app

const mobileStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    position: 'relative',
  },
  circle1: {
    zIndex: 1,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(-20%, -50%)'
  },
  circle2: {
    zIndex: 1,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(-60%, -10%)'
  },
  circle3: {
    zIndex: 1,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(95%, 100%)'
  },
  circle4: {
    zIndex: 1,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(55%, 145%)'
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF1D5'
  },
  topPart: {
    zIndex: 3,
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePart: {
    flexDirection: 'row',
  },
  image: {
    zIndex: 5,
    width: windowWidth * 0.4,
    height: windowHeight * 0.25,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  paperImage: {
    zIndex: 5,
    width: windowWidth * 0.25,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    transform: 'translate(-20%, 10%)',
    marginBottom: 15,
  },
  textTop: {
    color: '#3C2F60',
    fontWeight: 'bold',
    marginTop: '50px',
    width: '75%',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  textBottom: {
    color: '#3C2F60',
    fontWeight: 'bold',
    marginTop: '20px',
    width: '75%',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonPart: {
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  // button: {
  //   backgroundColor: '#9EC6F3',
  //   padding: 10,
  //   borderRadius: 5,
  //   width: '80%',
  // },
  // buttonText: {
  //   textAlign: 'center',
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  button: {
    height: 40,
    width: windowWidth * 0.80,
    borderRadius: 8,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.75)',
    backgroundColor: '#9EC6F3',
    paddingHorizontal: 60,
    paddingVertical: 0,
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  }
  
});

const webStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF1D5',
  },
  circle1: {
    zIndex: 1,
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(-20%, -50%)'
  },
  circle2: {
    zIndex: 1,
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    transform: 'translate(-60%, -10%)'
  },
  circle3: {
    zIndex: 1,
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    right: -100,
    top: 250,
  },
  circle4: {
    zIndex: 1,
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    backgroundColor: '#9FB3DF',
    borderRadius: windowWidth * 0.5,
    position: 'absolute',
    right: -50,
    top: 350,
  },
  container: {
    zIndex: 2,
    flex: 1,
    width: '100%',
    paddingTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topPart: {
    zIndex: 3,
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePart: {
    flexDirection: 'row',
  },
  image: {
    zIndex: 5,
    width: windowWidth * 0.4,
    height: windowHeight * 0.25,
    resizeMode: 'contain',
    marginBottom: 15,
    marginRight: -50,
  },
  paperImage: {
    zIndex: 5,
    width: windowWidth * 0.25,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    transform: 'translate(-20%, 10%)',
    marginBottom: 15,
  },
  textTop: {
    zIndex: 5,
    color: '#3C2F60',
    fontWeight: 'bold',
    marginTop: '50px',
    width: '75%',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  textBottom: {
    zIndex: 5,
    color: '#3C2F60',
    fontWeight: 'bold',
    marginTop: '20px',
    width: '75%',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonPart: {
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  // button: {
  //   backgroundColor: '#9EC6F3',
  //   padding: 10,
  //   borderRadius: 5,
  //   width: '80%',
  // },
  // buttonText: {
  //   textAlign: 'center',
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  button: {
    height: 40,
    width: windowWidth * 0.50,
    maxWidth: 400,
    borderRadius: 8,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.75)',
    backgroundColor: '#9EC6F3',
    paddingHorizontal: 60,
    paddingVertical: 0,
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  }
  
});