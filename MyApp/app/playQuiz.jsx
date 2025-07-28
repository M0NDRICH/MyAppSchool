import { View, Text, StyleSheet, Platform, Pressable} from 'react-native'
import React,{useState} from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
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
    <SafeAreaView style={webStyles.safeContainer}>
      <Link
      href='/home'
      asChild
      >
        <Pressable style={webStyles.backButton}>
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
        <View style={webStyles.quizBody}>
          <View style={webStyles.quizQuestion}>
            <Text style={webStyles.quizQuestionText}>{"Question Here"}</Text>
            <Text style={webStyles.quizQuestionText}>{"1 + 1?"}</Text>
          </View>
          <View style={webStyles.quizQuestionChoices}>
            <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>{"Option 1 here"}</Text>
            </View>
            <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>{"Option 2 here"}</Text>
            </View>
            <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>{"Option 3 here"}</Text>
            </View>
            <View style={webStyles.quizQuestionChoice}>
              <Text style={webStyles.quizQuestionChoiceText}>{"Option 4 here"}</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable style={webStyles.confirmButton}>
        <Text style={webStyles.confirmButtonText}>Confirm</Text>
      </Pressable>
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
    fontSize: '16',
  },
  quizBody: {
    width: '80%',
    height: '80%',
    gap: 20,
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