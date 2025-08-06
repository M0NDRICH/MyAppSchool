import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { data } from '@/data/quizzes'

const viewResult = () => {
  const [quizzes,                     setQuizzes] = useState(data);
  const [myAnswersData,         setMyAnswersData] = useState([]);
  const [correctAnswers,       setCorrectAnswers] = useState([]);
  const [correctAnswersDef, setCorrectAnswersDef] = useState([]);
  const [userAnswers,             setUserAnswers] = useState([]);
  const [userAnswersDef,       setUserAnswersDef] = useState([]);
  const [score,                         setScore] = useState(0);
  const [correctAnsState,     setCorrectAnsState] = useState(correctAnswers)
  const [targetQuizToken,     setTargetQuizToken] = useState(undefined);
  const [resultsQuiz,              setResultQuiz] = useState([]);

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
  },[quizzes]);

  useEffect(()=>{
    extractCorrectAnswer(targetQuizToken);
  }, [targetQuizToken]);

  useEffect(()=>{
    extractUserAnswer();
  },[myAnswersData && targetQuizToken])

  useEffect(()=>{
    evaluateAnswer();
  }, [userAnswers && correctAnswers]);

  function extractCorrectAnswer(quiz){
    const letterArr = ['a', 'b', 'c', 'd'];
    let result = [];
    let def    = [];

    quiz?.correctAnswers?.forEach((ans)=>{
      letterArr.forEach((letter)=>{
        if (ans[letter] !== null && ans[letter] !== undefined){
          // result.push((ans[letter]).toString());
          // result.push((letter).toUpperCase());
          result.push((letter).toUpperCase());
          def.push(ans[letter]);
        }
      })
    })

    setCorrectAnswers(result);
    setCorrectAnswersDef(def);
  }
 

  function extractUserAnswer(){
    const choices = targetQuizToken?.choices;

    myAnswersData.forEach((ans, index)=>{
      if(ans !== null && ans !== undefined){
        setUserAnswers(answers => [...answers, (ans).toUpperCase()]);

        const def = choices?.[index]?.[ans.toLowerCase()] ?? "N/A";
        setUserAnswersDef(answers => [...answers, def]);
      }
    })

  }

  const redirectToResultQuizPage = () => {
    router.push({pathname: '/resultQuiz', params: {id: id}})
  } 

  const printAnswers = () => {
    console.log(myAnswersData)
  }

  function getQuiz(id){
    return quizzes.find((quiz)=>
    quiz.id === Number(id)
    )
  }

  function evaluateAnswer(){
   
    let num = 0;
    console.log('user answers : '+ userAnswers);
    console.log('correct Answers : '+ correctAnswers)

    userAnswers?.forEach((userAns, index) => {
      if (userAns === correctAnswers[index])
      {
        const token = {
        "question" : targetQuizToken.questions[index],
        "num" : ++num,
        "letterOfCorrectAnswer" : correctAnswers[index],
        "defOfCorrectAnswer" : correctAnswersDef[index],
        "userAnswer" : userAnswers[index],
        "defOfUserAnswer" : userAnswersDef[index],
        "result" : "correct",
        }
        setResultQuiz(results => [...results, token]);
      }
      else
      {
        const token = {
        "question" : targetQuizToken.questions[index],
        "num" : ++num,
        "letterOfCorrectAnswer" : correctAnswers[index],
        "defOfCorrectAnswer" : correctAnswersDef[index],
        "userAnswer" : userAnswers[index],
        "defOfUserAnswer" : userAnswersDef[index],
        "result" : "wrong",
        }
        setResultQuiz(results => [...results, token]);
      }
    });

  };

  const printResults = () => {
    resultsQuiz.forEach((item)=>{
      console.log(item);
    });
  }

  if (resultsQuiz.lenth === 0)
  {
    return <View><Text>Loading...</Text></View>
  }

  const renderItem = ({item}) => {
    return <View 
            style={item.result === 'correct' ? styles.questionCard : styles.wrongQuestionCard} 
            key={item.num}>
            <View style={styles.questionCardHeader}>
              <View style={styles.quizNumber}>
              <Text style={styles.textSecondary}>{item.num}</Text>
              </View>
              <View style={styles.quizResult}>
                <Text style={styles.textSecondary}>{item.result}</Text>
              </View>
            </View>
            <View style={styles.mainBody}>
              <Text style={styles.textPrimary}>Question: </Text>
              <Text style={[styles.textTertiary, styles.questionText]}>{item.question}</Text>
            </View>
            <View style={styles.lowerBody}>
              <View style={styles.correctAnsArea}>
                <Text style={[styles.textPrimary, styles.correctAnsTag]}>{'Correct Answer: '+ item.letterOfCorrectAnswer}</Text>
                <View style={styles.details}>
                   <Text style={styles.textTertiary}>{item.defOfCorrectAnswer}</ Text>
                </View>
                
              </View>
              <View style={styles.userAnsArea}>
                <Text style={[styles.textPrimary, styles.userAnsTag]}>{'Your Answer: '+ item.userAnswer}</Text>
                <View style={styles.details}>
                  <Text style={styles.textTertiary}>{item.defOfUserAnswer}</Text>
                </View>
              </View>
            </View>
           </View>
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{redirectToResultQuizPage(); printResults()}}>
          <Text style={[styles.textPrimary, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.flatListStyle}
          data={resultsQuiz}
          renderItem={renderItem}
          keyExtractor={resultsQuiz => resultsQuiz.num.toString()}
        />

      </View>
    </SafeAreaView>
  )
}

export default viewResult

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#FFF1D5',
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 20,
    width: 100,
    height: 50,
    backgroundColor: '#9EC6F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  backButtonText: {
    color: 'white',
  },
  textPrimary: {
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textSecondary: {
    color: '#3C2F60',
    fontWeight: 500,
    fontSize: 16,
  },
  textTertiary: {
    color: '#3C2F60',
    fontWeight: 500,
    fontSize: 14,
  },
  flatListStyle: {
    marginTop: 50,
    width: '95%',
  },
  questionCard: {
    backgroundColor: '#9EC6F3',
    width: '90%',
    height: 450,
    borderWidth: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    margin: 'auto',
    marginBottom: 10,
    paddingVertical: 10,
  },
  wrongQuestionCard: {
    backgroundColor: '#CD5656',
    width: '90%',
    height: 450,
    borderWidth: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    margin: 'auto',
    marginBottom: 10,
    paddingVertical: 10,
  },
  questionCardHeader: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  quizNumber: {
    width: '20%',
    height: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizResult: {
    width: '40%',
    height: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBody: {
    flexDirection: 'column',
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  questionText: {
    marginLeft: 10,
  },
  lowerBody: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    height: '50%',
  },
  correctAnsTag: {
    backgroundColor: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: 180,
    height: 50,
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  correctAnsArea: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  details: {
    alignItems: 'flex-start',
  },
  correctAns: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  userAnsArea:{
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userAnsTag: {
    backgroundColor: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: 180,
    height: 50,
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  }
});