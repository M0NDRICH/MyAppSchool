import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { data } from '@/data/quizzes'
import playQuiz from './playQuiz'
import { styles } from '@/components/styles/resultQuiz'


// TODO: choii create a card to display the score then create a button that will redirect to page where the user can see the answers and questions, basically a review
const resultQuiz = () => {
  const [quizzes,                 setQuizzes] = useState(data);
  const [myAnswersData,     setMyAnswersData] = useState([]);
  const [correctAnswers,   setCorrectAnswers] = useState([]);
  const [userAnswers,         setUserAnswers] = useState([]);
  const [score,                     setScore] = useState(0);
  const [correctAnsState, setCorrectAnsState] = useState(correctAnswers)
  // const [userAnswerArr,     setUserAnswerArr] = useState([]);
  const [targetQuizToken, setTargetQuizToken] = useState(undefined);

  const {id} = useLocalSearchParams();

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
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("quizCollection");
        const storageQuizzes = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageQuizzes && storageQuizzes.length) {
          setQuizzes(storageQuizzes.sort((a,b)=> b.id - a.id))
        } else {
          setQuizzes(data.sort((a,b) => b.id - a.id))
        }
      } catch (e){
        console.error(e)
      }
    }

    fetchData();
  }, [data]);

  useEffect(()=>{
    const quiz = getQuiz(id);
    setTargetQuizToken(quiz); 
   
    // const correctAnswers = targetQuiz.correctAnswers;
    console.log('target quiz :' + targetQuizToken);
    console.log('correct answers: ' + correctAnswers);
  },[quizzes]);

  useEffect(()=>{
    extractCorrectAnswer(targetQuizToken);
  }, [targetQuizToken]);

  useEffect(()=>{
    extractUserAnswer();
  },[myAnswersData])

  useEffect(()=>{
    evaluateAnswer();
  }, [userAnswers && correctAnswers]);

  function extractCorrectAnswer(quiz){
    const letterArr = ['a', 'b', 'c', 'd'];
    let result = [];

    quiz?.correctAnswers?.forEach((ans)=>{
      letterArr.forEach((letter)=>{
        if (ans[letter] !== null && ans[letter] !== undefined){
          // result.push((ans[letter]).toString());
          // result.push((letter).toUpperCase());
          result.push((letter).toUpperCase());
        }
      })
    })

    setCorrectAnswers(result);
    // return result;
  }
 

  function extractUserAnswer(){

    myAnswersData.forEach((ans)=>{
      if(ans !== null && ans !== undefined){
        setUserAnswers(answers => [...answers, (ans).toUpperCase()])
      }
    })

  }

  // useEffect(() => {
  //   if (myAnswersData.length > 0) {
  //     const arr = [...myAnswersData]
  //     const extracted = extractUserAnswer(arr);
  //     setUserAnswerArr(extracted);
  //     console.log('Extracted user answers:', extracted);
  //     evaluateAnswer(extracted);
  //   }
  // }, [myAnswersData]);


  const printAnswers = () => {
    console.log(myAnswersData)
  }

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }

  function evaluateAnswer(){
   
    let tempScore = 0;
    console.log('user answers : '+ userAnswers);
    console.log('correct Answers : '+ correctAnswers)

    userAnswers?.forEach((userAns, index) => {
      if (userAns === correctAnswers[index]) {
        ++tempScore;
      }
    });

    console.log(`Final score: ${tempScore}/${correctAnswers.length}`);
    setScore(tempScore)
  };

  const clearStorage = async () => {
    setScore(0);
    await AsyncStorage.removeItem('myAnswers');
  }
  


  if (!targetQuizToken)
  { 
    return (<View><Text>Loading...</Text></View>);
  }
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Link
      href='/quizMenu'
      asChild
      >
        <TouchableOpacity style={styles.backButton} onPress={clearStorage}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.resultCard}>
        <View style={styles.resultCardMainBody}>
          <Text style={styles.resultTextTitle}>Result:</Text>
          <Text style={styles.resultText}>Your Score is {score}/{targetQuizToken.questions.length}!</Text>
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

