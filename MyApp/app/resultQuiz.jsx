import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'


// TODO: choii create a card to display the score then create a button that will redirect to page where the user can see the answers and questions, basically a review
const resultQuiz = () => {
  const  [myAnswersData, setMyAnswersData]  = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myAnswers');
        if (jsonValue !== null){
          setMyAnswersData(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error('Error loading answers:', error);
      }
    };

    fetchAnswers();
  }, []);

  const printAnswers = () => {
    console.log(myAnswersData)
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.resultCard}>
        <View style={styles.resultCardMainBody}>
          <Text style={styles.resultTextTitle}>Result:</Text>
          <Text style={styles.resultText}>Your Score is 5/5!</Text>
        </View>
        <TouchableOpacity onPress={()=>{ printAnswers();}} style={styles.buttonReviewAnswers}>
          <Text style={styles.buttonText}>View Answers</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default resultQuiz

const styles = StyleSheet.create({
  safeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF1D5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#9EC6F3',
    width: '15%',
    height: 50,
    borderRadius: 8,
    marginTop: '5%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: '#BDDDE4',
    width: '80%',
    height: '60%',
    borderRadius: 8,
    gap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCardMainBody: {
    position: 'relative',
    backgroundColor: 'white',
    width: '90%',
    height: 250,
    borderRadius: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  resultTextTitle: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#3C2F60',
  },
  resultText: {
    width: '100%',
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonReviewAnswers: {
    backgroundColor: '#9EC6F3',
    width: '90%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButton: {
    backgroundColor: '#9EC6F3',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})