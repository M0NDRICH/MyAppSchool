
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity, Platform} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { data } from '@/data/quizzes';
import { MaterialIcons } from '@expo/vector-icons'
import React,{ useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  const [quizzes,                   setQuizzes] = useState(data);
  const [temporaryQuizzes, setTemporaryQuizzes] = useState(data);
  const [temporary,               setTemporary] = useState(true);

  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     await Font.loadAsync(MaterialIcons.font);
  //     setFontsLoaded(true);
  //   }

  //   loadFonts();
  // }, []);

  // if (!fontsLoaded) {
  //   return <View />; // or return a loading spinner
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("quizCollection");
        const storageQuizzes = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageQuizzes && storageQuizzes.length) {
          setQuizzes(storageQuizzes.sort((a,b)=> b.id - a.id))
          setTemporary(false);
          console.log(quizzes);
        } else {
          setTemporaryQuizzes(data.sort((a,b) => b.id - a.id))
          setTemporary(true);
        }
      } catch (e){
        console.error(e)
      }
    }

    const clearMyAnswersStorage = async () => {
      await AsyncStorage.removeItem('myAnswers');
    }

    fetchData();
    clearMyAnswersStorage();
  }, [data]);

  useEffect(() => {
    console.log("Updated quizzes:", quizzes);
  }, [quizzes]);


  useEffect(() => {

    if (temporary !== true) 
    {
       const storeData = async () => {
          try {
            const jsonValue = JSON.stringify(quizzes)
            await AsyncStorage.setItem("quizCollection", jsonValue)
          } catch (e) {
            console.error(e)
          }
        }

        storeData();
    }
  }, [quizzes])

  const removeQuiz = (idToRemove) => {
    if (!temporary)
    {
      const updated = quizzes
        .filter(item => item.id !== idToRemove);

      setQuizzes(updated);
    }
    else if (temporary)
    {
       const updated = quizzes
        .filter(item => item.id !== idToRemove);

        setTemporaryQuizzes(updated);
    }
    
  };


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

const webStyles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#FFF1D5',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 8,
  },
  headerText: {
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  midPart: {
    width: '80%',
    height: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quizTokenLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  quizTokenContainer: {
    width: '100%',
  },
  quizToken: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#BDDDE4',
    marginBottom: 10,
  },
  quizText: {
    color: '#3C2F60',
    fontWeight: 700,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#BDDDE4',
    width: 40,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuizButton: {
    marginTop: 16,
    width:  '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
  },
  addQuizText: {
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomPart: {
    width: '100%',
  },
  backButton: {
    width:  '80%',
    height: 50,
    backgroundColor: '#9EC6F3',
    borderRadius: 8,
    justifyContent: 'center',
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})

const mobileStyles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#FFF1D5',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 8,
  },
  headerText: {
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  midPart: {
    width: '80%',
    height: '60%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quizTokenLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  quizTokenContainer: {
    width: '100%',
  },
  quizToken: {
    width: '75%',
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#BDDDE4',
    marginBottom: 10,
  },
  quizText: {
    color: '#3C2F60',
    fontWeight: 700,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#BDDDE4',
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuizButton: {
    marginTop: 16,
    width:  '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
  },
  addQuizText: {
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomPart: {
    width: '100%',
  },
  backButton: {
    width:  '80%',
    height: 50,
    backgroundColor: '#9EC6F3',
    borderRadius: 8,
    justifyContent: 'center',
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})