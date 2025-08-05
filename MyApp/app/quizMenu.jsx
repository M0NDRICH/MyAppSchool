
import { View, Text, Pressable, FlatList, TouchableOpacity, Platform} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { data } from '@/data/quizzes';
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { webStyles, mobileStyles } from "@/components/styles/quizMenuStyles"
import { useQuizStorage } from '@/hooks/useQuizStorage'


const home = () => {
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  const { quizzes, temporaryQuizzes, temporary , removeQuiz } = useQuizStorage();

  // const [quizzes,                   setQuizzes] = useState(data);
  // const [temporaryQuizzes, setTemporaryQuizzes] = useState(data);
  // const [temporary,               setTemporary] = useState(true);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("quizCollection");
  //       const storageQuizzes = jsonValue != null ? JSON.parse(jsonValue) : null;

  //       if (storageQuizzes && storageQuizzes.length) {
  //         setQuizzes(storageQuizzes.sort((a,b)=> b.id - a.id))
  //         setTemporary(false);
  //         console.log(quizzes);
  //       } else {
  //         setTemporaryQuizzes(data.sort((a,b) => b.id - a.id))
  //         setTemporary(true);
  //       }
  //     } catch (e){
  //       console.error(e)
  //     }
  //   }

  //   const clearMyAnswersStorage = async () => {
  //     await AsyncStorage.removeItem('myAnswers');
  //   }

  //   fetchData();
  //   clearMyAnswersStorage();
  // }, [data]);

  // useEffect(() => {
  //   console.log("Updated quizzes:", quizzes);
  // }, [quizzes]);


  // useEffect(() => {

  //   if (temporary !== true) 
  //   {
  //      const storeData = async () => {
  //         try {
  //           const jsonValue = JSON.stringify(quizzes)
  //           await AsyncStorage.setItem("quizCollection", jsonValue)
  //         } catch (e) {
  //           console.error(e)
  //         }
  //       }

  //       storeData();
  //   }
  // }, [quizzes])

  // const removeQuiz = (idToRemove) => {
  //   if (!temporary)
  //   {
  //     const updated = quizzes
  //       .filter(item => item.id !== idToRemove);

  //     setQuizzes(updated);
  //   }
  //   else if (temporary)
  //   {
  //      const updated = quizzes
  //       .filter(item => item.id !== idToRemove);

  //       setTemporaryQuizzes(updated);
  //   }
    
  // };


  const renderItem = ({ item }) => (
    <View style={styles.quizTokenLine}>
      <Link
      href={{
        pathname: '/playQuiz',
        params: { id: item.id }
      }}
      asChild
      >
      <Pressable style={styles.quizToken}>
        <Text style={styles.quizText}>{item.title}</Text>
        <Text style={styles.quizText}>Items: {item.questions.length}</Text>
      </Pressable>
      </Link>

      <TouchableOpacity
      style={styles.deleteButton}
      onPress={()=>{removeQuiz(item.id);}}
      >
        <MaterialIcons 
          name={"delete"} 
          size={24} 
          color={"black"} 
          selectable={undefined}/>
      </TouchableOpacity>
    </View>
  )

  if (!quizzes || !temporaryQuizzes)
  {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Let's Play and Learn!</Text>
        </View>
        <View style={styles.midPart}>
          <FlatList
          style={styles.quizTokenContainer}
          data={temporary === true ? temporaryQuizzes : quizzes }
          renderItem={renderItem}
          keyExtractor={quiz => quiz.id}
          contentContainerStyle={{flexGrow: 1}}
          keyboardDismissMode="on-drag"
          />
          
          <Link
          href='/addQuiz'
          style={{ marginHorizontal: 'auto' }}
          asChild
          >
          <Pressable style={styles.addQuizButton}>
            <Text style={styles.addQuizText}>+Add Quiz</Text>
          </Pressable>
          </Link>
        </View>
        <View style={styles.bottomPart}>
          <Link
          href='/'
          style={{ marginHorizontal: 'auto' }}
          asChild
          >
          <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default home

