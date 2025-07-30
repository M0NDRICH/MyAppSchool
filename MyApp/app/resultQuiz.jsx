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
  const score = 0;
  const targetQuiz = getQuiz(id);
  const correctAnswers = targetQuiz.correctAnswers;
  const [correctAnsState, setCorrectAnsState] = useState(correctAnswers)
  let correctAnswersArr = extractAnswer(correctAnsState);
  // let userAnswerArr;
  const [userAnswerArr, setUserAnswerArr] = useState([]);


  // const   = () => {
  //   const corAns = [...correctAnswers];

  //   // corAns.forEach((item)=>{
  //   //   var ans = {"answer":};
  //   // })
    
  // }

  function extractAnswer(ans){
    const letterArr = ['a', 'b', 'c', 'd'];
    const arr = ans;
    let result = [];

    // const foundLetter = letterArr.find(letter => letter >= ans);

    // return foundLetter;

    arr.forEach((ans)=>{
      letterArr.forEach((letter)=>{
        if (ans[letter] !== null && ans[letter] !== undefined){
          result.push((ans[letter]).toString());
        }
      })
    })
    return result;
  }
  console.log(extractAnswer(correctAnswers));

  // const evaluateAnswer = () => {
    // const userAnsDataArr = [...myAnswersData];
    // const correctAnsDataArr = [...correctAnsState]
    // const userAnswer = extractAnswer(userAnsDataArr);
    // const correctAnswer = extractAnswer(correctAnsDataArr);

    // correctAnswer.forEach((corrArgs)=>{
    //   userAnswer.forEach((userAnsArgs)=>{
    //     corrArgs === userAnsArgs ? score += 1 : score += 0;
    //     console.log(corrArgs === userAnsArgs);
    //   })
    // })
    
    // // console.log('quiz score'+score);
    // console.log(userAnswer);
    // console.log(correctAnswers);
    // console.log(userAnswer[0] === correctAnswer[0]);
  // }

  // const usersAnswer=[...myAnswersData]
  // console.log(correctAnswers);
  // console.log(usersAnswer);
  // const sample1 = {"d":"dog"};
  // const sample2 = {"d":"dog"};

  // console.log(sample1.d === sample2.d ? 'same' : 'not same');
  
  // console.log('try sample finding letter d '+ '' + assignLetterOfCorrectAnswer());

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myAnswers');
        console.log('Raw from AsyncStorage:', jsonValue); 
        if (jsonValue !== null){
          const parsed = JSON.parse(jsonValue);
          setMyAnswersData(JSON.parse(jsonValue));
          console.log('Parsed:', parsed); 
          const arrSample = [...myAnswersData]
          userAnswerArr = extractAnswer(arrSample)
          console.log('myAnswersData '+ myAnswersData )
          console.log(userAnswerArr);
        }
      } catch (error) {
        console.error('Error loading answers:', error);
      }
    };

    fetchAnswers();
  }, []);

  // useEffect(()=>{

  //     if (myAnswersData.length !== 0 && myAnswersData.length >0 ) {
  //     const arrSample = [...myAnswersData]
  //     userAnswerArr = extractAnswer(arrSample);
  //     console.log('extracted array '+ userAnswerArr);
  //     evaluateAnswer(userAnswerArr);
  //     }

  // }, [myAnswersData])
  useEffect(() => {
    if (myAnswersData.length > 0) {
      const extracted = extractAnswer(myAnswersData);
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

  // function evaluateAnswers(){
  //   correctAnswers.forEach((correctAns)=>{
  //     console.log(correctAns);
  //     const userAnswers = [...myAnswers];
  //     userAnswers.forEach((userAns)=>{
  //       correctAns === userAns ? console.log('correct') : console.log('wrong');
  //     })
  //   })

  // };
  // function evaluateAnswers() {
  //   const userAnswers = [...myAnswers];
  //   correctAnswers.map((correctAns) => {
  //     const result = userAnswers.map((userAns) => correctAns === userAns ? 'correct' : 'wrong');
  //     console.log(result);
  //   });
  // }

  const evaluateAnswer = (userAnswerArr) => {
    const correctAnswerArr = extractAnswer(correctAnswers);
    let score = 0;

    userAnswerArr.forEach((userAns, index) => {
      if (userAns === correctAnswerArr[index]) {
        score++;
      }
    });

    console.log(`Final score: ${score}/${correctAnswerArr.length}`);
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <Link
      href='/playQuiz'
      asChild
      >
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </Link>
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