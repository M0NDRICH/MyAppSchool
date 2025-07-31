import { View, Text, StyleSheet, Platform, Pressable, FlatList, TouchableOpacity, Animated} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { useLocalSearchParams, Link, useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from '@/data/quizzes'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'




const playQuiz = () => {
  const {id} = useLocalSearchParams();
  const [quizzes, setQuizzes] = useState(data);
  // const [myAnswersData, setMyAnswers] = useState(myAnswers);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const router = useRouter();
  let currentPage = useRef(0);
  let targetQuiz;
  let targetQuestion = [];
  let answer;

  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  const saveAnswersToStorage = async (answers) => {
    try {
      await AsyncStorage.setItem('myAnswers', JSON.stringify(answers));
      console.log('Answers saved!');
    } catch (error) {
      console.error('Failed to save answers: ', error);
    }
  };
 

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }

  const bindingVow = (id, question, choices) => {
    return {
      "id": id,
      "question": question,
      "choices" : choices
    }
  }

  const renderChoices = (choices) => {
    return (
      <>
        {choices.a !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('A')}}>
          <View style={styles.quizQuestionChoice}>
              <Text style={styles.quizQuestionChoiceText}>A: {choices.a}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.b !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('B')}}>
          <View style={styles.quizQuestionChoice}>
              <Text style={styles.quizQuestionChoiceText}>B: {choices.b}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.c !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('C')}}>
          <View style={styles.quizQuestionChoice}>
              <Text style={styles.quizQuestionChoiceText}>C: {choices.c}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.d !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('D')}}>
          <View style={styles.quizQuestionChoice}>
              <Text style={styles.quizQuestionChoiceText}>D: {choices.d}</Text>
          </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderQuizCard = (question, choices) => (

     <View style={styles.quizBody}>
      <View style={styles.quizBodyContainer}>
        <View style={styles.quizQuestion}>
          <Text style={styles.quizQuestionText}>{'Question:'}</Text>
          <Text style={styles.quizQuestionText}>{question}</Text>
        </View>
        <View style={styles.quizQuestionChoices}>
          {renderChoices(choices)}
        </View>
      </View>
    </View>
  )

  targetQuiz = getQuiz(id);
  if (!targetQuiz) return <Text>Quiz not found</Text>;

  const numberOfQuestions = targetQuiz.questions.length;
  const [answers, setAnswers] = useState(new Array(numberOfQuestions));
  const pageNum = answers.length;
  
  
  for(let i = 0; i < targetQuiz.questions.length; i++){
    let question = targetQuiz.questions[i];
    let choices = targetQuiz.choices[i];

    targetQuestion.push(bindingVow( i,question, choices));
  }

  function handleAnswer(currentAnswer){
    answer = currentAnswer;
  }

  function resetAnswers(){
    setAnswers(new Array(numberOfQuestions));
    currentPage.current = 0;
  }

  const saveAnswer = async () => {
    let num = currentPage.current;
    if (currentPage.current < pageNum){
      const updated = [...answers];
      // const myAnswersUpdated = [...myAnswersData];
      // myAnswersUpdated[num] = {answer};
      if(updated[num] === undefined && answer !== undefined){
        updated[num] = {answer};
        // setMyAnswers(myAnswersUpdated);
        setAnswers(updated);
        num !== targetQuestion.length - 1 && (answer = undefined);
        console.log(updated);
        // console.log(myAnswersUpdated)
        await saveAnswersToStorage(updated);
        currentPage.current++;
      }
    }
  }

  function redirect(){
    console.log('redirect is running');
    
    const itemAnswer = [...answers];
    //const result = itemAnswer.every((item)=>  item !== null);
    //console.log(result);
    console.log(itemAnswer[numberOfQuestions-2]);
    console.log(itemAnswer[numberOfQuestions-1]);
    console.log(answer);
    if(quizIndex === targetQuestion.length - 1 && answer !== undefined){
      router.push(`/resultQuiz?id=${encodeURIComponent(id)}`);
    }
  }

  const confirmButton = () => {
    let num = currentPage.current;
    const currentAnswer = [...answers];
    console.log('currentAnswer:'+currentAnswer[num - 1]);
    if (quizIndex < targetQuestion.length - 1 && answer !== undefined) {
      setQuizIndex(quizIndex + 1); 
    }
  }

  const clearStorage = async () => {
    await AsyncStorage.removeItem('myAnswers');
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Link
      href='/quizMenu'
      asChild
      >
        <Pressable style={styles.backButton} onPress={()=>{resetAnswers();}}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={styles.quizCard}>
        <View style={styles.quizHeader}>
          <View style={styles.quizTitle}>
            <Text style={styles.quizTitleText}>{targetQuiz.title}</Text>
          </View>
          <View style={styles.quizNumOfItems}>
            <Text style={styles.quizNumOfItemsText}>{targetQuiz.questions.length}</Text>
          </View>
        </View>
        <View style={[styles.quizMainContainer]}>
        {renderQuizCard(targetQuestion[quizIndex].question, targetQuestion[quizIndex].choices)}
        </View>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={()=>{confirmButton(); saveAnswer(); redirect()}} disabled={quizIndex === targetQuestion.length || answer===null}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default playQuiz

const webStyles = StyleSheet.create({
  safeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF1D5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  quizCard: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BDDDE4',
    width: '70%',
    height: '70%',
    borderRadius: 8,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '80%',
    marginVertical: 10,
  },
  quizTitle: {
    backgroundColor: 'white',
    width: '20%',
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizTitleText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizNumOfItems: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '20%',
    borderRadius: 8,
  },
  quizNumOfItemsText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizMainContainer: {
    width: '80%',
    height: 500,
    backgroundColor: 'purple',
  },
  quizBody: {
    width: '100%',
    height: 500,
    borderRadius: 8,
    backgroundColor: 'aquamarine',
  },
  quizBodyContainer: {
    width: '100%',
  },
  quizQuestion: {
    backgroundColor: 'white',
    width: '100%',
    height: 250,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  quizQuestionText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  quizQuestionChoices: {
    flexDirection: 'column',
    width: '100%',
    height: '60%',
    justifyContent: 'space-around',
  },
  quizQuestionChoice: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    padding: 10,
  },
  quizQuestionChoiceText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#9EC6F3',
    width: '70%',
    marginTop: 10,
    paddingVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

const mobileStyles = StyleSheet.create({
  safeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF1D5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#9EC6F3',
    width: '25%',
    height: 50,
    borderRadius: 8,
    marginTop: '5%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  quizCard: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BDDDE4',
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '80%',
    marginVertical: 10,
  },
  quizTitle: {
    backgroundColor: 'white',
    maxWidth: 500,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizTitleText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizNumOfItems: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '25%',
    borderRadius: 8,
  },
  quizNumOfItemsText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizMainContainer: {
    width: '90%',
    height: 500,
  },
  quizBody: {
    width: '100%',
    maxHeight: 300,
    borderRadius: 8,
  },
  quizBodyContainer: {
    width: '100%',
  },
  quizQuestion: {
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  quizQuestionText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  quizQuestionChoices: {
    flexDirection: 'column',
    width: '100%',
    height: '60%',
    justifyContent: 'space-around',
  },
  quizQuestionChoice: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    padding: 10,
  },
  quizQuestionChoiceText: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#9EC6F3',
    width: '70%',
    marginTop: 10,
    paddingVertical: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});