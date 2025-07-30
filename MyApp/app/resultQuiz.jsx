import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { data } from '@/data/quizzes'
import playQuiz from './playQuiz'


// TODO: choii create a card to display the score then create a button that will redirect to page where the user can see the answers and questions, basically a review
const resultQuiz = () => {
  const [quizzes, setQuizzes] = useState(data);
  const {id} = useLocalSearchParams();
  const  [myAnswersData, setMyAnswersData]  = useState([]);
  const [score, setScore] = useState(0);
  const targetQuiz = getQuiz(id);
  const correctAnswers = targetQuiz.correctAnswers;
  const [correctAnsState, setCorrectAnsState] = useState(correctAnswers)
  let correctAnswersArr = extractCorrectAnswer(correctAnsState);
  // let userAnswerArr;
  const [userAnswerArr, setUserAnswerArr] = useState([]);

  function extractCorrectAnswer(ans){
    const letterArr = ['a', 'b', 'c', 'd'];
    const arr = ans;
    let result = [];

    arr.forEach((ans)=>{
      letterArr.forEach((letter)=>{
        if (ans[letter] !== null && ans[letter] !== undefined){
          // result.push((ans[letter]).toString());
          result.push((letter).toUpperCase());
        }
      })
    })
    return result;
  }
  console.log(extractCorrectAnswer(correctAnswers));

  function extractUserAnswer(ans){
    const arr = ans;
    let result = [];

    arr.forEach((ans)=>{
      if(ans.answer !== null && ans.answer !== undefined){
        result.push((ans.answer).toString());
      }
    })

    console.log(result);
    return result;
  }

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myAnswers');
        console.log('Raw from AsyncStorage:', jsonValue); 
        if (jsonValue !== null){
          const parsed = JSON.parse(jsonValue);
          setMyAnswersData(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error('Error loading answers:', error);
      }
    };

    fetchAnswers();
  }, []);

  useEffect(() => {
    if (myAnswersData.length > 0) {
      const arr = [...myAnswersData]
      const extracted = extractUserAnswer(arr);
      setUserAnswerArr(extracted);
      console.log('Extracted user answers:', extracted);
      evaluateAnswer(extracted);
    }
  }, [myAnswersData]);


  const printAnswers = () => {
    console.log(myAnswersData)
  }

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }

  const evaluateAnswer = (userAnswerArr) => {
    const correctAnswerArr = extractCorrectAnswer(correctAnswers);
    let tempScore = 0;

    userAnswerArr.forEach((userAns, index) => {
      if (userAns === correctAnswerArr[index]) {
        ++tempScore;
      }
    });

    console.log(`Final score: ${tempScore}/${correctAnswerArr.length}`);
    setScore(tempScore)
  };

  const clearStorage = async () => {
    await AsyncStorage.removeItem('myAnswers');
  }
  


  return (
    <SafeAreaView style={styles.safeContainer}>
      <Link
      href='/playQuiz'
      asChild
      >
        <TouchableOpacity style={styles.backButton} onPress={clearStorage}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.resultCard}>
        <View style={styles.resultCardMainBody}>
          <Text style={styles.resultTextTitle}>Result:</Text>
          <Text style={styles.resultText}>Your Score is {score}/{correctAnsState.length}!</Text>
        </View>
        <TouchableOpacity onPress={()=>{ printAnswers();}} style={styles.buttonReviewAnswers}>
          <Text style={styles.buttonText}>View Answers</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.okButton} onPress={clearStorage}>
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