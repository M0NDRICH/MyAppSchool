import { View, Text, StyleSheet, Pressable, FlatList, Platform, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'

const addQuiz = () => {
  // const styles = Platform.OS === 'web' ? webStyles : mobileStyles;
  const styles = webStyles;
  
  const [inputQuestionValue, setInputQuestionValue] = useState('');
  const [inputTitleValue,       setInputTitleValue] = useState('');
  const [disableButtons,         setDisableButtons] = useState(false);
  const [inputAValue,               setInputAValue] = useState('');
  const [inputBValue,               setInputBValue] = useState('');
  const [inputCValue,               setInputCValue] = useState('');
  const [inputDValue,               setInputDValue] = useState('');
  const [correctAnswerA,         setCorrectAnswerA] = useState(false);
  const [correctAnswerB,         setCorrectAnswerB] = useState(false);
  const [correctAnswerC,         setCorrectAnswerC] = useState(false);
  const [correctAnswerD,         setCorrectAnswerD] = useState(false);
  const [disableField,             setDisableField] = useState(false);
  const [toggleButton,             setToggleButton] = useState('On');  // For editing quizToken
  const [quizToken,                   setQuizToken] = useState([]);    // The array that holds all the quizTokens or the Questions with its respective choices or options
  const [finalCorrectAnswer, setFinalCorrectAnswer] = useState('none');// This holds the final correct answer of a question, used when in editing or creating mode
  

  // This is a proxy token used for getting the user inputs and also serves as a template
  const sampleQuestionToken = {
    "type":"proxyToken",
    "status":"alive",
    "editable": true,
    "id": 0,
    "question":"What does the fox says?",
    "A":"fox fox fox fooox",
    "B":"Awww awww awww awww",
    "C":"Ting ning ning ning",
    "D":"Ahh Daddy!",
    "correctAnswer":"C",
  };

  const addNewQuizToken = (newItem) => {
    setQuizToken(prev => [...prev, newItem]);
  }

  const disableProxy = () => {
    setDisableField(!disableField)
    toggleButton === 'On' ? quizToken[0].editable = false : quizToken[0].editable = true;
  }

  // For setting up the proxy token once the page is rendering
  useEffect(()=>{
    addNewQuizToken(sampleQuestionToken);
  }, []);

  const getQuizToken = (id) => {
    let targetQuizToken = quizToken.find(token => token.id === id);
    targetQuizToken === undefined && (targetQuizToken = 'not_found');

    return targetQuizToken;
  }

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

  const assignValuesToTextFields = (item) => {
    setInputQuestionValue(item.question);
    setInputAValue(item.A);
    setInputBValue(item.B);
    setInputCValue(item.C);
    setInputDValue(item.D);
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
    } 
    else if (mode === 'Cancel')
    {
      targetQuiz.question;
      targetQuiz.editable;
      targetQuiz.A;
      targetQuiz.B;
      targetQuiz.C;
      targetQuiz.D;
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
  //                                       If click it will run the saveEdittedTokeng() in which it will handle the values and then
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

  const setCorrectAnswer = (id ,letter) => {
    const targetQuizToken = getQuizToken(id);
    
    if (targetQuizToken !== 'not_found')
    {
      switch (letter) {
        case "A":
          setCorrectAnswerA(true);
          break;
        case "B":
          setCorrectAnswerB(true);
          break;
        case "C":
          setCorrectAnswerC(true);
          break;
        case "D":
          setCorrectAnswerD(true);
          break;
        default:
          console.log('setting a correct answer is not executed');
          break;
      }
    }
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
                      {/* <Text>{toggleButton === 'On' ? 'E' : 'S'}</Text> */}
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
                    <TouchableOpacity style={styles.correctAnswerToggle}>
                      <MaterialIcons 
                      name={correctAnswerA === true ? 'star': 'star-outline'}
                      size={24} 
                      selectable={undefined}
                      color="#3C2F60"
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
                    <TouchableOpacity style={styles.correctAnswerToggle}>
                      <MaterialIcons 
                      name={correctAnswerB === true ? 'star': 'star-outline'}
                      size={24} 
                      selectable={undefined}
                      color="#3C2F60"
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
                    <TouchableOpacity style={styles.correctAnswerToggle}>
                      <MaterialIcons 
                      name={correctAnswerC === true ? 'star': 'star-outline'}
                      size={24} 
                      selectable={undefined}
                      color="#3C2F60"
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
                    <TouchableOpacity style={styles.correctAnswerToggle}>
                      <MaterialIcons 
                      name={correctAnswerD === true ? 'star': 'star-outline'}
                      size={24} 
                      selectable={undefined}
                      color="#3C2F60"
                      />
                    </TouchableOpacity>
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
  }

  const addNewQuestionToken = () => {
    if(quizToken[0].status !== 'dead')
    {const question = inputQuestionValue;
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

    // const id = [...quizToken].length === 0 && 0;
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
      "correctAnswer" : '',
    }

    addNewQuizToken(newQuizToken);
    resetInputValues();
    console.log(quizToken)}
  }

  const tryPrint = () => {
    console.log(quizToken);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={[styles.textPrimary, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Your Own Quiz!</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textPrimary}>Title: </Text>
          <TextInput
          style={[styles.textField, styles.textSecondary]}
          placeholder='Type your title here...'
          value={inputTitleValue}
          onChangeText={text => setInputTitleValue(text)}
          />
        </View>
        <View style={styles.questionContainer}>
          <FlatList
          style={styles.quizTokenContainer}
          data={quizToken}
          renderItem={renderItem}
          keyExtractor={quizToken => quizToken.id}
          />
        </View>
        <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.addNewButton} onPress={()=>{addNewQuestionToken()}}>
              <Text style={[styles.textPrimary, styles.saveButtonText]}>Add new question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={()=>{tryPrint()}}>
              <Text style={[styles.textPrimary, styles.saveButtonText]}> Save </Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default addQuiz

const webStyles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#FFF1D5',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: '#9EC6F3',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: 'white',
  },
  header: {
    backgroundColor: 'white',
    width: '80%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 50,
    marginBottom: 10,
  },
  headerText: {
    textAlign: 'center',
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 10,
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
  textField: {
    paddingHorizontal: 10,
    width: '100%',
  },
  questionContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: '80%',
    height: '55%',
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  numOfCard: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  questionCardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightSideHeader: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 15,
  },
  editButton: {
    backgroundColor: "#9EC6F3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#9EC6F3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  quizTokenContainer: {
    width: '100%',
    height: '20%',
  },
  questionCard: {
    backgroundColor: '#BDDDE4',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    width: '95%',
    height: '100%',
    alignItems: 'center',
  },
  question: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  questionInputText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    width: '97%',
  },
  questionChoices: {
    width: '95%',
  },
  choiceLetter: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 10,
  },
  choiceInputField: {
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  addNewButton: {
    backgroundColor: '#9EC6F3',
    borderRadius: 8,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#9EC6F3',
    borderRadius: 8,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color:  'white',
  },
  editMode: {
    backgroundColor: '#9EC6F3',
  },
  editModeButton: {
    backgroundColor: 'white'
  }
})