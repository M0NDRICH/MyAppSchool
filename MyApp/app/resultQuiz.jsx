import { View, Text, TouchableOpacity } from 'react-native'
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
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View style={{width: 100, height: 50, backgroundColor: 'aquamarine'}}>
        <TouchableOpacity onPress={()=>{ printAnswers();}}>
          <Text>resultQuiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default resultQuiz