import { data as defaultQuizzes} from '@/data/quizzes';
import { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
  
export const useQuizStorage = () => {
  const [quizzes,                   setQuizzes] = useState(defaultQuizzes);
  const [temporaryQuizzes, setTemporaryQuizzes] = useState(defaultQuizzes);
  const [temporary,               setTemporary] = useState(true);


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
          setTemporaryQuizzes(defaultQuizzes.sort((a,b) => b.id - a.id))
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
  }, []);

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

  return {
    quizzes: temporary ? temporaryQuizzes : quizzes,
    removeQuiz,
    temporaryQuizzes,
    temporary
  };
};