import { View, Text, StyleSheet, Platform, Pressable, FlatList, TouchableOpacity, Animated} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { useLocalSearchParams, Link, useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { data } from '@/data/quizzes'
import { myAnswers } from '@/data/quizAnswers'
import AsyncStorage from '@react-native-async-storage/async-storage'




const playQuiz = () => {
  const [quizzes,                   setQuizzes] = useState(data);
  const [temporaryQuizzes, setTemporaryQuizzes] = useState(data);
  const [temporary,               setTemporary] = useState(true);
  const [quizToken,               setQuizToken] = useState(undefined);
  const [isStorageLoaded,   setIsStorageLoaded] = useState(false);
  const [currentPage,           setCurrentPage] = useState(0);
  const [currentAnswer,       setCurrentAnswer] = useState(undefined);
  const [correctAnswers,     setCorrectAnswers] = useState([]);
  const [userAnswers,           setUserAnswers] = useState([]);

  const {id} = useLocalSearchParams();
  const router = useRouter();
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  function getQuizToken(id){
    let result;

    if (temporary)
    {
      result = temporaryQuizzes.find((item)=> item.id === parseInt(id));
    } 
    else if (!temporary)
    {
      result = quizzes.find((item) => item.id === parseInt(id));
    }

    return result;
  }

  const extractAndAssignValues = (token) => {
    const correctAns = [];
    const questions  = [];
  }

  const redirectToResultQuizPage = () => {
    router.push({pathname: '/resultQuiz', params: {id: id}})
  } 

  const nextPage = () => {

    if (currentPage === quizToken?.questions?.length - 1 && currentAnswer !== undefined)
    {
      setUserAnswers(answers => [...answers, currentAnswer]);
      console.log(userAnswers);
      setCurrentPage(0);
      setCurrentAnswer(undefined);
      redirectToResultQuizPage();
    }
    else if (currentPage < quizToken?.questions?.length && currentAnswer !== undefined)
    {
      setCurrentPage(current => current + 1);
      setUserAnswers(answers => [...answers, currentAnswer]);
      setCurrentAnswer(undefined);
    }
    
  }

  useEffect (()=>{
    const saveAnswersToStorage = async () => {
      try {
        await AsyncStorage.setItem('myAnswers', JSON.stringify(userAnswers));
        console.log('Answers saved!');
      } catch (error) {
        console.error('Failed to save answers: ', error);
      }
    };

    saveAnswersToStorage();
  }, [userAnswers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("quizCollection");
        const storageQuizzes = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageQuizzes && storageQuizzes.length) {
          setQuizzes(storageQuizzes.sort((a,b)=> b.id - a.id))
          setTemporary(false);
          const result = storageQuizzes.find((item)=> item.id === parseInt(id));
          setQuizToken(result);
        } else {
          setTemporaryQuizzes(data.sort((a,b) => b.id - a.id))
          setTemporary(true);
          const result = data.find((item)=> item.id === parseInt(id));
          setQuizToken(result);
        }
        setIsStorageLoaded(true);
      } catch (e){
        console.error(e);
        setIsStorageLoaded(true);
      }
    }

    fetchData();
  }, [data]);
  

  useEffect(()=>{
    if (isStorageLoaded)
    {
      const result = getQuizToken(id);
      setQuizToken(result);
      console.log(quizToken);
    }
    
  },[isStorageLoaded]);

  const handleAnswer = (letter) => {
    setCurrentAnswer(letter);
  }

  const renderChoices = (choices) => {
    if (!choices || typeof choices !== 'object') return null;
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

  const renderQuizCard = (choices) => (

     <View style={styles.quizBody}>
      <View style={styles.quizBodyContainer}>
        <View style={styles.quizQuestion}>
          <Text style={styles.quizQuestionText}>{'Question:'}</Text>
          <Text style={styles.quizQuestionText}>{quizToken?.questions[currentPage]}</Text>
        </View>
        <View style={styles.quizQuestionChoices}>
          {renderChoices(quizToken?.choices[currentPage])}
        </View>
      </View>
    </View>
  )

  if (!quizToken)
  { 
    return (<View><Text>Loading...</Text></View>);
  }


  return (
    <SafeAreaView style={styles.safeContainer}>
      <Link
      href='/quizMenu'
      asChild
      >
        <TouchableOpacity style={styles.backButton} onPress={()=>{}}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.quizCard}>
        <View style={styles.quizHeader}>
          <View style={styles.quizTitle}>
            <Text style={styles.quizTitleText}>{quizToken?.title}</Text>
          </View>
          <View style={styles.quizNumOfItems}>
            <Text style={styles.quizNumOfItemsText}>{(Number(currentPage) + 1) +'/' + quizToken?.questions?.length}</Text>
          </View>
        </View>
        <View style={[styles.quizMainContainer]}>
        {renderQuizCard()}
        </View>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={()=>{console.log('quiz token'+ quizToken); nextPage();}}>
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