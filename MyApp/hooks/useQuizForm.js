import { View, Text, Platform, TextInput, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useCallback } from 'react'
import { webStyles, mobileStyles} from '@/components/styles/addQuizStyles'
import { CustomDialog } from '@/components/modal/customModal'

export const useQuizForm = () => {
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  const [inputQuestionValue,   setInputQuestionValue] = useState('');
  const [inputTitleValue,         setInputTitleValue] = useState('');
  const [disableButtons,           setDisableButtons] = useState(false);
  const [inputAValue,                 setInputAValue] = useState('');
  const [inputBValue,                 setInputBValue] = useState('');
  const [inputCValue,                 setInputCValue] = useState('');
  const [inputDValue,                 setInputDValue] = useState('');
  const [correctAnswerA,           setCorrectAnswerA] = useState(false);
  const [correctAnswerB,           setCorrectAnswerB] = useState(false);
  const [correctAnswerC,           setCorrectAnswerC] = useState(false);
  const [correctAnswerD,           setCorrectAnswerD] = useState(false);
  const [disableField,               setDisableField] = useState(false);
  const [toggleButton,               setToggleButton] = useState('On');  // For editing quizToken
  const [quizToken,                     setQuizToken] = useState([]);    // The array that holds all the quizTokens or the Questions with its respective choices or options
  const [finalQuizTokenArray, setFinalQuizTokenArray] = useState([]);    // This holds the final quiz token and the other quiz tokens across all files

  // For custom modal
  const [dialogVisible, setDialogVisible] = useState(false);
  const [titleDialog,     setTitleDialog] = useState('');
  const [dialog,               setDialog] = useState('');

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    setTitleDialog('');
    setDialog('');
    setDialogVisible(false);
  };

   // This is a proxy token used for getting the user inputs and also serves as a template
  const sampleQuestionToken = {
    "type":"proxyToken",
    "status":"alive",
    "editable": true,
    "id": 0,
    "question":"Who was the philosopher of the Art of Happiness?",
    "A":"Epicurus",
    "B":"Aristotle",
    "C":"Plato",
    "D":"Socrates",
    "correctAnswer":"A",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("quizCollection");
        const storageQuizzes = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageQuizzes && storageQuizzes.length) {
          setFinalQuizTokenArray(storageQuizzes.sort((a,b)=> b.id - a.id))
        } else {
          setFinalQuizTokenArray(finalQuizTokenArray.sort((a,b) => b.id - a.id))
        }
      } catch (e){
        console.error(e)
      }
    }

    fetchData();
  }, []);

  useEffect(()=>{
    const saveAnswersToStorage = async () => {
      try {
        const quiz = JSON.stringify(finalQuizTokenArray);
        await AsyncStorage.setItem('quizCollection', quiz);
        console.log('Quiz is saved!');
      } catch (error) {
        console.error('Failed to save finalQuizToken: ', error);
      }
    };

    saveAnswersToStorage();
  }, [finalQuizTokenArray])

  

  const addNewQuizToken = (newItem) => {
    setQuizToken(prev => [...prev, newItem]);
  }

  const disableProxy = () => {
    setDisableField(!disableField)
    toggleButton === 'On' ? quizToken[0].editable = false : quizToken[0].editable = true;
  }

  // For setting up the proxy token once the page is rendered
  useEffect(()=>{
    addNewQuizToken(sampleQuestionToken);
  }, []);

  const getQuizToken = (id) => {
    let targetQuizToken = quizToken.find(token => token.id === id);
    targetQuizToken === undefined && (targetQuizToken = 'not_found');

    return targetQuizToken;
  }

  const goToQuizMenu = () => {
    router.push('/quizMenu');
  };

  // this function kills or disables all the buttons except the quizToken that invokes it
  // id:      id of the quizToken that invokes the function thus making the quizToken immune to killing or disabling function
  //          id can be set to string none, in which it is use when trying to revert back all the quizToken's status to 'alive'
  // methods: kill   = disables all button functions by setting all token's status to 'dead'
  //          revive = revert all status back to 'alive'
  function killAllTokens(id = 'none', method){
    
    if(id !== 'none' && method === 'kill')
    {
      quizToken.map((item)=>{
        if(item.id === id)
        {
          item.status = 'alive';
        }
        else
        {
          item.status = 'dead';
        }
      });
    }
    else if (id === 'none' && method === 'revive')
    {
      quizToken.map((item)=>{
        item.status = 'alive';
      });
    }
  }

  const clearAnswerOptions = () => {
    setCorrectAnswerA(false);
    setCorrectAnswerB(false);
    setCorrectAnswerC(false);
    setCorrectAnswerD(false);
  }

  const setCorrectAnswer = (letter, id = 'none') => {
    clearAnswerOptions();

      switch (letter) {
        case "A":
          inputAValue !== '' ? setCorrectAnswerA(true) : customModal("Invalid!", 1, 'open');
          break;
        case "B":
          inputBValue !== '' ? setCorrectAnswerB(true) : customModal("Invalid", 1, 'open');
          break;
        case "C":
          inputCValue !== '' ? setCorrectAnswerC(true) : customModal("Invalid", 1, 'open');
          break;
        case "D":
          inputDValue !== '' ? setCorrectAnswerD(true) : customModal("Invalid", 1, 'open');
          break;
        default:
          console.log('setting a correct answer is not executed');
          break;
      }

  }

  const assignValuesToTextFields = (item) => {
    setInputQuestionValue(item.question);
    setInputAValue(item.A);
    setInputBValue(item.B);
    setInputCValue(item.C);
    setInputDValue(item.D);
    setCorrectAnswer(item.correctAnswer);
  }

  const getCorrectAnswer = () => {
    let result;
    
    correctAnswerA && (result = 'A');
    correctAnswerB && (result = 'B');
    correctAnswerC && (result = 'C');
    correctAnswerD && (result = 'D');

    return result;
  }


  const saveEdittedToken = (id, mode) => {
    const targetQuiz = quizToken[id];

    if (mode === 'Edit')
    {
      targetQuiz.question = inputQuestionValue;
      targetQuiz.editable = false;
      targetQuiz.A        = inputAValue;
      targetQuiz.B        = inputBValue;
      targetQuiz.C        = inputCValue;
      targetQuiz.D        = inputDValue;
      targetQuiz.correctAnswer = getCorrectAnswer();
    } 
    else if (mode === 'Cancel')
    {
      targetQuiz.question;
      targetQuiz.editable;
      targetQuiz.A;
      targetQuiz.B;
      targetQuiz.C;
      targetQuiz.D;
      targetQuiz.correctAnswer;
    } 
    
  }


  // this function has two modes and execute depends on the toggleButton
  // if the button is click it will check
  // if toggleButton is equals to 'On'  => the current quizToken that invokes it will enter an edit mode in which it
  //                                       enables text fields to accept user inputs while the default value of the
  //                                       text fields are the actual value of the quizToken instead of placeholders.
  //                                       During in edit mode the icon of the button will change to 'check icon' and also
  //                                       will set the the toggleButton = 'Off'.
  // if toggleButton is equals to 'Off' => the icon of the button will appear as an 'check icon' instead of an 'edit icon'.
  //                                       If click it will run the saveEdittedToken() in which it will handle the values and then
  //                                       reassign or modify the values of the current quizToken that invokes it, then save to the 
  //                                       quizToken array. Then run some of the other functions and lastly it will set the toggleButton = 'On'.
  const editQuestionToken = (id) => {
    if (toggleButton === 'On')
    {
      const targetQuizToken = getQuizToken(id);

      resetInputValues();

      if (targetQuizToken !== 'not_found')
      {
        killAllTokens(targetQuizToken.id, 'kill')
        disableProxy();
        assignValuesToTextFields(targetQuizToken);
        // setCorrectAnswer(getCorrectAnswer());
        targetQuizToken.editable = true;
      }

      setDisableButtons(true);
      setToggleButton('Off');
    }
    else if (toggleButton === 'Off')
    {
      saveEdittedToken(id, "Edit");
      resetInputValues();
      disableProxy();
      setToggleButton('On');
      setDisableButtons(false);
      killAllTokens('none', 'revive');
    }
    
  }

  const cancelEditToken = (id) => {
    
    const targetQuizToken = quizToken[id];
    disableProxy();
    assignValuesToTextFields(targetQuizToken);
    saveEdittedToken(id, "Cancel");
    resetInputValues();
    targetQuizToken.editable = false;
    setToggleButton('On');
    killAllTokens('none', 'revive');
    console.log(targetQuizToken.correctAnswer);
  }
  
  const deleteQuestionToken = (id) => {
    const result = quizToken.filter((item)=>{
      if (item.id !== id) {
        return true;
      }
    })

    setQuizToken([]);

    let customId = 0;
    result.forEach((item)=>{
      if(item.id !== 0)
      {
        item.id = customId;
      }
      addNewQuizToken(item);
      customId++;
    })
  }

  const renderItem = ({item}) => {
    if (item.type === 'proxyToken')
    {
      return <View style={styles.questionCard}
          key={item.id}
          >
          <View style={styles.numOfCard}>
            <Text style={styles.textPrimary}>#{Number(item.id)}</Text>
          </View>
          <View style={styles.question}>
            <Text style={[styles.textPrimary]}>Question: </Text>
            <TextInput
            style={[styles.textSecondary, styles.questionInputText]}
            placeholder='Type the question here...'
            value={!disableField ? inputQuestionValue : ''}
            editable={!disableField}
            onChangeText={text => setInputQuestionValue(text)}
            />
          </View>
          <View style={styles.questionChoices}>
            <View style={styles.choiceLetter}>
              <Text style={styles.textPrimary}>A: </Text>
              <TextInput
              style={[styles.textSecondary, styles.choiceInputField]}
              placeholder='Type text here for A...'
              value={!disableField ? inputAValue : ''}
              editable={!disableField}
              onChangeText={text => setInputAValue(text)}
              />
              <TouchableOpacity style={styles.correctAnswerToggle}
              disabled={(item.status === 'dead')}
              onPress={()=>{setCorrectAnswer('A');}}
              >
                <MaterialIcons 
                name={(correctAnswerA === true && item.status === 'alive')? 'star': 'star-outline'}
                size={40} 
                selectable={undefined}
                color="#3C2F60"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.choiceLetter}>
              <Text style={styles.textPrimary}>B: </Text>
              <TextInput
              style={[styles.textSecondary, styles.choiceInputField]}
              placeholder='Type text here for B...'
              value={!disableField ? inputBValue : ''}
              editable={!disableField}
              onChangeText={text => setInputBValue(text)}
              />
              <TouchableOpacity style={styles.correctAnswerToggle}
              disabled={(item.status === 'dead')}
              onPress={()=>{setCorrectAnswer('B');}}
              >
                <MaterialIcons 
                name={(correctAnswerB === true && item.status === 'alive')? 'star': 'star-outline'}
                size={40} 
                selectable={undefined}
                color="#3C2F60"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.choiceLetter}>
              <Text style={styles.textPrimary}>C: </Text>
              <TextInput
              style={[styles.textSecondary, styles.choiceInputField]}
              placeholder='Type text here for C...'
              value={!disableField ? inputCValue : ''}
              editable={!disableField}
              onChangeText={text => setInputCValue(text)}
              />
              <TouchableOpacity style={styles.correctAnswerToggle}
              disabled={(item.status === 'dead')}
              onPress={()=>{setCorrectAnswer('C');}}
              >
                <MaterialIcons 
                name={(correctAnswerC === true && item.status === 'alive')? 'star': 'star-outline'}
                size={40} 
                selectable={undefined}
                color="#3C2F60"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.choiceLetter}>
              <Text style={styles.textPrimary}>D: </Text>
              <TextInput
              style={[styles.textSecondary, styles.choiceInputField]}
              placeholder='Type text here for D...'
              value={!disableField ? inputDValue : ''}
              editable={!disableField}
              onChangeText={text => setInputDValue(text)}
              />
              <TouchableOpacity style={styles.correctAnswerToggle}
              disabled={(item.status === 'dead')}
              onPress={()=>{setCorrectAnswer('D');}}
              >
                <MaterialIcons 
                name={(correctAnswerD === true && item.status === 'alive')? 'star': 'star-outline'}
                size={40} 
                selectable={undefined}
                color="#3C2F60"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.correctAnswerField}>
              <Text 
              style={styles.textPrimary}>Correct Answer: </Text>
              <Text
              style={
                [item.status === 'alive' ? ((getCorrectAnswer() === undefined )? styles.textSecondary : styles.textPrimary) : styles.textSecondary]
              }
              >
                {(getCorrectAnswer() !== undefined && item.status === 'alive') ? getCorrectAnswer() : 'Click star to set correct answer!'}
                </Text>
            </View>
          </View>
        </View>
    } 
    else 
    {
      return <View style={[styles.questionCard, toggleButton === 'Off' && item.editable && styles.editMode]}
              key={item.id}
              >
                <View style={styles.questionCardHeader}>
                  <View style={styles.numOfCard}>
                    <Text style={styles.textPrimary}>#{Number(item.id)}</Text>
                  </View>
                  <View style={styles.rightSideHeader}>
                    <TouchableOpacity
                     disabled={item.status === 'alive' ? false : true}
                     style={[styles.editButton, toggleButton === 'Off' && item.editable && styles.editModeButton]}
                     onPress={()=>{editQuestionToken(item.id)}}>
                      <MaterialIcons
                      name={(!item.editable)? 'edit' : 'check'} 
                      size={24} 
                      color='black'
                      selectable={undefined}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                     disabled={item.status === 'alive' ? false : true}
                     style={[styles.deleteButton, toggleButton === 'Off' && item.editable  && styles.editModeButton]}
                     onPress=
                     {()=>{if (toggleButton === 'On' && !item.editable) {deleteQuestionToken(item.id);} else { cancelEditToken(item.id);}}}>
                      <MaterialIcons 
                      name={(!item.editable) ? "delete" : "clear" } 
                      size={24} 
                      color={(!item.editable) ? "black" : "red"} 
                      selectable={undefined}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.question}>
                  <Text style={[styles.questionText, styles.textPrimary]}>Question: </Text>
                  <TextInput
                  style={[styles.textSecondary, styles.questionInputText]}
                  value={item.editable ? inputQuestionValue : item.question}
                  editable={item.editable}
                  onChangeText={text => setInputQuestionValue(text)}
                  />
                </View>
                <View style={styles.questionChoices}>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>A: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.editable ? inputAValue : item.A}
                    editable={item.editable}
                    onChangeText={text => setInputAValue(text)}
                    />
                    <TouchableOpacity style={styles.correctAnswerToggle}
                    onPress={()=>{item.editable && setCorrectAnswer('A', item.id);}}
                    >
                      <MaterialIcons 
                      name={ toggleButton === 'Off'&&(item.status === 'alive' && correctAnswerA === true) || item.correctAnswer === 'A' ? 'star': 'star-outline'}
                      size={40} 
                      selectable={undefined}
                      color={toggleButton === 'On' ? '#3C2F60' : (correctAnswerA === false ? (item.status === 'alive' ? '#9EC6F3' : '#3C2F60') : '#3C2F60')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>B: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.editable ? inputBValue : item.B}
                    editable={item.editable}
                    onChangeText={text => setInputBValue(text)}
                    />
                    <TouchableOpacity style={styles.correctAnswerToggle}
                    onPress={()=>{item.editable && setCorrectAnswer('B', item.id);}}
                    >
                      <MaterialIcons 
                      name={toggleButton === 'Off'&&(item.status === 'alive' && correctAnswerB === true )|| item.correctAnswer === 'B'  ? 'star': 'star-outline'}
                      size={40} 
                      selectable={undefined}
                      color={toggleButton === 'On' ? '#3C2F60' : (correctAnswerB === false ? (item.status === 'alive' ? '#9EC6F3' : '#3C2F60') : '#3C2F60')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>C: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.editable ? inputCValue : item.C}
                    editable={item.editable}
                    onChangeText={text => setInputCValue(text)}
                    />
                    <TouchableOpacity style={styles.correctAnswerToggle}
                    onPress={()=>{item.editable && setCorrectAnswer('C', item.id);}}
                    >
                      <MaterialIcons 
                      name={toggleButton === 'Off'&&(item.status === 'alive' && correctAnswerC === true) || item.correctAnswer === 'C'  ? 'star': 'star-outline'}
                      size={40} 
                      selectable={undefined}
                      color={toggleButton === 'On' ? '#3C2F60' : (correctAnswerC === false ? (item.status === 'alive' ? '#9EC6F3' : '#3C2F60') : '#3C2F60')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>D: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.editable ? inputDValue : item.D}
                    editable={item.editable}
                    onChangeText={text => setInputDValue(text)}
                    />
                    <TouchableOpacity style={styles.correctAnswerToggle}
                    onPress={()=>{item.editable && setCorrectAnswer('D', item.id);}}
                    >
                      <MaterialIcons 
                      name={toggleButton === 'Off'&&(item.status === 'alive' && correctAnswerD === true) || item.correctAnswer === 'D'  ? 'star': 'star-outline'}
                      size={40} 
                      selectable={undefined}
                      color={toggleButton === 'On' ? '#3C2F60' : (correctAnswerD === false ? (item.status === 'alive' ? '#9EC6F3' : '#3C2F60') : '#3C2F60')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.correctAnswerField}>
                    <Text 
                    style={styles.textPrimary}>Correct Answer: </Text>
                    <Text
                    style={
                      [styles.textPrimary]
                    }
                    >
                      { item.status === 'alive' ? (toggleButton === 'On' ? (item.correctAnswer !== undefined && item.correctAnswer) : getCorrectAnswer()) : item.correctAnswer}
                      </Text>
                  </View>
                </View>
              </View>
    }
  }

  function resetInputValues(){
    setInputQuestionValue('');
    setInputAValue('');
    setInputBValue('');
    setInputCValue('');
    setInputDValue('');
    clearAnswerOptions();
  }

  function customModal(title, messageId = 'none' , method){
    const errMessage = [
      "Please indicate the correct answer of the current question!",
      "Can't set the selected letter as the correct answer because it's empty!",
      "Please type the question of the current page/card!",
      "A question requires more than one option",
      "Please make a title for this quiz!",
    ];

    if (messageId !==  'none' && method === 'open')
    {
      setDialog(errMessage[messageId]);
      setTitleDialog(title);
      showDialog();
    }
  }

  const addNewQuestionToken = () => {
    let invalid = false; // sets to true when required textinputs are left omitted
    if(quizToken[0].status !== 'dead')
    {
      const question = inputQuestionValue;
      const choiceA = inputAValue;
      const choiceB =  inputBValue;
      const choiceC = inputCValue;
      const choiceD = inputDValue;

      const choices = {
        "a": choiceA,
        "b": choiceB,
        "c": choiceC,
        "d": choiceD,
      };

      const correctAnswer = getCorrectAnswer();

      if (correctAnswer === undefined)
      {
        customModal("Can't Proceed...", 0 , 'open');
        invalid = true;
      } 

      let id;
      if (quizToken.length === 0)
      {
        id = 0;
      }
      else if (quizToken.length > 0)
      {
        id = Number(quizToken.length);
      }

      const newQuizToken = {
        "type":"token",
        "status":"alive",
        "editable": false,
        "id": id,
        "question": question,
        "A":choiceA,
        "B":choiceB,
        "C":choiceC,
        "D":choiceD,
        "correctAnswer" : correctAnswer,
      }

      if (!invalid)
      {
        addNewQuizToken(newQuizToken);
        resetInputValues();
        console.log(quizToken)
      }
      
    }
  }

  const tryPrint = () => {
    console.log(finalQuizTokenArray);
  }

  const generateNextId = (quizzes) => {
    if (quizzes.length === 0) return 1;
    return Math.max(...quizzes.map(q => q.id)) + 1;
  };

  const renderHeader = () => {
    if (Platform.OS === 'web') {
      return <View style={styles.header}>
              <Text style={styles.headerText}>Create Your Own Quiz!</Text>
            </View>
    }
    return null;
  }

  const quizTokenBinding = (title,items) => {
    let theFinalQuizToken;
    let id;
    let questions      = [];
    let choices        = [];
    let correctAnswers = [];

    const questionTokens = items.filter((item)=>{
      if (item.id !== 0)
      {
        return true;
      }
    })

    questionTokens.forEach((item)=>{
      questions.push(item.question);
    });

    questionTokens.forEach((item)=>{
      choices.push({
        "a" : item.A,
        "b" : item.B,
        "c" : item.C,
        "d" : item.D
      })
    });

    questionTokens.forEach((item)=>{
      const letter  = item.correctAnswer;
      const letterOfChoice = (letter).toLowerCase();
      const details = item[letter];

      correctAnswers.push({ [letterOfChoice] : details});
    });

    // finalQuizTokenArray.length === 0 ? id = 1 : (id = Number(finalQuizTokenArray.length) + 1);

    id = generateNextId(finalQuizTokenArray);

    theFinalQuizToken = {
      "id": id,
      "title": title,
      "questions": questions,
      "choices": choices,
      "correctAnswers": correctAnswers,
    };

    console.log(theFinalQuizToken);

    setFinalQuizTokenArray(prev => [theFinalQuizToken, ...prev ]);
    
  }

  const clearQuizCollection = async () => {
    try {
      await AsyncStorage.removeItem("quizCollection");
      console.log("quizCollection removed");
    } catch (e) {
      console.error("Failed to remove quizCollection:", e);
    }
  };

  return {
    inputQuestionValue,   setInputQuestionValue,
    inputTitleValue,         setInputTitleValue,
    disableButtons,           setDisableButtons,
    inputAValue,                 setInputAValue,
    inputBValue,                 setInputBValue,
    inputCValue,                 setInputCValue,
    inputDValue,                 setInputDValue,
    correctAnswerA,           setCorrectAnswerA,
    correctAnswerB,           setCorrectAnswerB,
    correctAnswerC,           setCorrectAnswerC,
    correctAnswerD,           setCorrectAnswerD,
    disableField,               setDisableField,
    toggleButton,               setToggleButton,
    quizToken,                     setQuizToken,
    finalQuizTokenArray, setFinalQuizTokenArray,

    // functions
    addNewQuestionToken,
    disableProxy,
    getQuizToken,
    goToQuizMenu,
    killAllTokens,
    clearAnswerOptions,
    setCorrectAnswer,
    assignValuesToTextFields,
    getCorrectAnswer,
    saveEdittedToken,
    editQuestionToken,
    cancelEditToken,
    deleteQuestionToken,
    renderItem,
    resetInputValues,
    addNewQuestionToken,
    tryPrint,
    generateNextId,
    renderHeader,
    quizTokenBinding,
    clearQuizCollection,

    // For Modal
    dialogVisible, setDialogVisible,
    dialog,        setDialog,
    titleDialog,
    showDialog, 
    hideDialog,
  };

};