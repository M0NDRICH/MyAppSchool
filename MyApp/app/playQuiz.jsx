import { View, Text, StyleSheet, Platform, Pressable, FlatList, TouchableOpacity, Animated} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { useLocalSearchParams, Link, useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from '@/data/quizzes'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'


let currentPage = useRef(0);

const playQuiz = () => {
  const {id} = useLocalSearchParams();
  const [quizzes, setQuizzes] = useState(data);
  const [myAnswersData, setMyAnswers] = useState(myAnswers);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const router = useRouter();
  let targetQuiz;
  let targetQuestion = [];
  let answer;

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
          <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>A: {choices.a}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.b !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('B')}}>
          <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>B: {choices.b}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.c !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('C')}}>
          <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>C: {choices.c}</Text>
          </View>
          </TouchableOpacity>
        )}
        {choices.d !== null && (
          <TouchableOpacity onPress={()=>{ handleAnswer('D')}}>
          <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>D: {choices.d}</Text>
          </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderQuizCard = (question, choices) => (

     <View style={webStyles.quizBody}>
      <View style={webStyles.quizBodyContainer}>
        <View style={webStyles.quizQuestion}>
          <Text style={webStyles.quizQuestionText}>{'Question:'}</Text>
          <Text style={webStyles.quizQuestionText}>{question}</Text>
        </View>
        <View style={webStyles.quizQuestionChoices}>
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
      const myAnswersUpdated = [...myAnswersData];
      myAnswersUpdated[num] = {answer};
      updated[num] = {answer};
      setMyAnswers(myAnswersUpdated);
      setAnswers(updated);
      answer = null;
      console.log(updated);
      console.log(myAnswersUpdated)
      await saveAnswersToStorage(updated);
      currentPage.current++;
    }
  }

  function redirect(){
    console.log('redirect is running');
    
    const itemAnswer = [...answers];
    //const result = itemAnswer.every((item)=>  item !== null);
    //console.log(result);
    console.log(itemAnswer[numberOfQuestions-2]);
    console.log(itemAnswer[numberOfQuestions-1]);
    if(quizIndex === targetQuestion.length - 1){
      router.push('/resultQuiz');
    }
  }

  const printAnswers = () => { 
    console.log('printButton is pressed')
    // const itemToken = answers[0];
    // console.log(itemToken.answer)
    // answers.forEach((item)=>{
    //   const token = item;
    //   console.log(token.answer)
    // })
    console.log(answers);
    console.log(myAnswersData)
  }

  const confirmButton = () => {
    const updated = [...answers];
  if (quizIndex < targetQuestion.length - 1 && updated[currentPage.current] != null) {
    setQuizIndex(quizIndex + 1); 
  }
  }

  const clearStorage = async () => {
    await AsyncStorage.removeItem('myAnswers');
  }

  return (
    <SafeAreaView style={webStyles.safeContainer}>
      <Link
      href='/home'
      asChild
      >
        <Pressable style={webStyles.backButton} onPress={()=>{resetAnswers();}}>
          <Text style={webStyles.buttonText}>Back</Text>
        </Pressable>
      </Link>
      <View style={webStyles.quizCard}>
        <View style={webStyles.quizHeader}>
          <View style={webStyles.quizTitle}>
            <Text style={webStyles.quizTitleText}>{targetQuiz.title}</Text>
          </View>
          <View style={webStyles.quizNumOfItems}>
            <Text style={webStyles.quizNumOfItemsText}>{targetQuiz.questions.length}</Text>
          </View>
        </View>
        <View style={[webStyles.quizMainContainer]}>
          {/* <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={targetQuestion}
          keyExtractor={(quiz)=>quiz.id.toString()}
          initialScrollIndex={currentIndex}
          ListEmptyComponent={<Text>No Items</Text>}
          renderItem={({item}) => (
            renderQuizCard(item.question, item.choices)
          )}
        /> */}
        {renderQuizCard(targetQuestion[quizIndex].question, targetQuestion[quizIndex].choices)}
        </View>
      </View>
      <TouchableOpacity style={webStyles.confirmButton} onPress={()=>{confirmButton(); saveAnswer(); redirect()}} disabled={quizIndex === targetQuestion.length || answer===null}>
        <Text style={webStyles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={webStyles.confirmButton} onPress={()=>{clearStorage()}}>
        <Text>clear answers</Text>
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