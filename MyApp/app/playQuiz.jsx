import { View, Text, StyleSheet, Platform, Pressable, FlatList, TouchableOpacity} from 'react-native'
import React,{useState, useRef} from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from '@/data/quizzes'

const playQuiz = () => {
  const {id} = useLocalSearchParams();
  const [quizzes, setQuizzes] = useState(data);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  let targetQuiz;
  let targetQuestion = [];

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }

  const handleNext = () => {
  if (currentIndex < targetQuestion.length - 1) {
    quizIndex = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  }
  };

  // const confirmButton = () => {
  //   if (currentIndex < targetQuestion.length - 1){
  //     const quizIndex = currentIndex + 1;
  //     playQuiz();
  //   }
  // }
 const confirmButton = () => {
  if (quizIndex < targetQuestion.length - 1) {
    setQuizIndex(quizIndex + 1); // ✅ trigger re-render with new question
  }
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
          <View style={webStyles.quizQuestionChoice}>
            <Text style={webStyles.quizQuestionChoiceText}>A: {choices.a}</Text>
          </View>
        )}
        {choices.b !== null && (
          <View style={webStyles.quizQuestionChoice}>
            <Text style={webStyles.quizQuestionChoiceText}>B: {choices.b}</Text>
          </View>
        )}
        {choices.c !== null && (
          <View style={webStyles.quizQuestionChoice}>
            <Text style={webStyles.quizQuestionChoiceText}>C: {choices.c}</Text>
          </View>
        )}
        {choices.d !== null && (
          <View style={webStyles.quizQuestionChoice}>
            <Text style={webStyles.quizQuestionChoiceText}>D: {choices.d}</Text>
          </View>
        )}
      </>
    );
  };

  const abc = ['A','B', 'C', 'D'];

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
  
  for(let i = 0; i < targetQuiz.questions.length; i++){
    let question = targetQuiz.questions[i];
    let choices = targetQuiz.choices[i];

    targetQuestion.push(bindingVow( i,question, choices));
  }

 console.log(`targetquestion: ${JSON.stringify(targetQuestion[0].choices)}`)

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
        {/* <View style={webStyles.quizBody}>
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
        </View> */}
        <View style={webStyles.quizMainContainer}>
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
        
        {/* {renderQuizCard(targetQuestion[0].question, targetQuestion[0].choices)}
         */}
      </View>
      <TouchableOpacity style={webStyles.confirmButton} onPress={confirmButton} disabled={quizIndex === targetQuestion.length - 1}>
        <Text style={webStyles.confirmButtonText}>Confirm</Text>
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
    width: 250,
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
    width: 250,
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