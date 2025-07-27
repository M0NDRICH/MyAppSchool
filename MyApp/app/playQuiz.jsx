import { View, Text, StyleSheet, Platform } from 'react-native'
import React,{useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from '@/data/quizzes'

const playQuiz = () => {
  const {id} = useLocalSearchParams();
  const [quizzes, setQuizzes] = useState(data);
  let targetQuiz;
  console.log(id ? 'not null' : 'is null');
  console.log(id);

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }
  targetQuiz = getQuiz(id);
  // console.log(targetQuiz ? 'not null' : 'is null');

  if (!targetQuiz) return <Text>Quiz not found</Text>;

  return (
    <SafeAreaView>
      <View>
        <Text>{targetQuiz.title}</Text>
      </View>
    </SafeAreaView>

  )
}

export default playQuiz