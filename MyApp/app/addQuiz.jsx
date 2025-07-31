import { View, Text, StyleSheet, Pressable, FlatList, Platform, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import React, { useState, useEffect } from 'react'

const addQuiz = () => {
  // const styles = Platform.OS === 'web' ? webStyles : mobileStyles;
  const styles = webStyles;
  const [quizToken,                   setQuizToken] = useState([]);
  const [inputQuestionValue, setInputQuestionValue] = useState('');
  const [inputTitleValue,       setInputTitleValue] = useState('');
  const [inputAValue,               setInputAValue] = useState('');
  const [inputBValue,               setInputBValue] = useState('');
  const [inputCValue,               setInputCValue] = useState('');
  const [inputDValue,               setInputDValue] = useState('');

  const sampleQuestionToken = {
    "type":"proxyToken",
    "id": 0,
    "question":"What does the fox says?",
    "A":"fox fox fox fooox",
    "B":"Awww awww awww awww",
    "C":"Ting ning ning ning",
    "D":"Ahh Daddy!"
  };

  const addNewQuizToken = (newItem) => {
    setQuizToken(prev => [...prev, newItem]);
  }

  useEffect(()=>{
    addNewQuizToken(sampleQuestionToken);
  }, []);

  const editCard = (id) => {
    console.log('edit card is running '+ id)
  }

  /*
  const renderItem = ({item}) => (
    <View style={styles.questionCard}
    key={item.id}
    >
      <View style={styles.question}>
        <Text style={[styles.questionText, styles.textPrimary]}>Question: </Text>
        <TextInput
        style={[styles.textSecondary, styles.questionInputText]}
        value={item.question}
        editable={false}
        onChangeText={text => setInputQuestionValue(text)}
        />
      </View>
      <View style={styles.questionChoices}>
        <View style={styles.choiceLetter}>
          <Text style={styles.textPrimary}>A: </Text>
          <TextInput
          style={[styles.textSecondary, styles.choiceInputField]}
          placeholder='Type text here for A...'
          value={item.A}
          editable={false}
          onChangeText={text => setInputAValue(text)}
          />
        </View>
        <View style={styles.choiceLetter}>
          <Text style={styles.textPrimary}>B: </Text>
          <TextInput
          style={[styles.textSecondary, styles.choiceInputField]}
          value={item.B}
          editable={false}
          onChangeText={text => setInputBValue(text)}
          />
        </View>
        <View style={styles.choiceLetter}>
          <Text style={styles.textPrimary}>C: </Text>
          <TextInput
          style={[styles.textSecondary, styles.choiceInputField]}
          value={item.C}
          editable={false}
          onChangeText={text => setInputCValue(text)}
          />
        </View>
        <View style={styles.choiceLetter}>
          <Text style={styles.textPrimary}>D: </Text>
          <TextInput
          style={[styles.textSecondary, styles.choiceInputField]}
          value={item.D}
          editable={false}
          onChangeText={text => setInputDValue(text)}
          />
        </View>
      </View>
    </View>
  )*/

  const renderItem = ({item}) => {
    if (item.type === 'proxyToken')
    {
      return <View style={styles.questionCard}
              key={item.id}
              onPress={()=> editCard(id)}
              >
                <View style={styles.numOfCard}>
                  <Text style={styles.textPrimary}>#{Number(item.id)}</Text>
                </View>
                <View style={styles.question}>
                  <Text style={[styles.textPrimary]}>Question: </Text>
                  <TextInput
                  style={[styles.textSecondary, styles.questionInputText]}
                  placeholder='Type the question here...'
                  value={inputQuestionValue}
                  onChangeText={text => setInputQuestionValue(text)}
                  />
                </View>
                <View style={styles.questionChoices}>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>A: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    placeholder='Type text here for A...'
                    value={inputAValue}
                    onChangeText={text => setInputAValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>B: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    placeholder='Type text here for B...'
                    value={inputBValue}
                    onChangeText={text => setInputBValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>C: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    placeholder='Type text here for C...'
                    value={inputCValue}
                    onChangeText={text => setInputCValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>D: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    placeholder='Type text here for D...'
                    value={inputDValue}
                    onChangeText={text => setInputDValue(text)}
                    />
                  </View>
                </View>
              </View>
    } 
    else 
    {
      return <View style={styles.questionCard}
              key={item.id}
              >
                <View style={styles.questionCardHeader}>
                  <View style={styles.numOfCard}>
                    <Text style={styles.textPrimary}>#{Number(item.id)}</Text>
                  </View>
                  <View style={styles.rightSideHeader}>
                    <TouchableOpacity style={styles.editButton}>
                      <Text>E</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                      <Text>D</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.question}>
                  <Text style={[styles.questionText, styles.textPrimary]}>Question: </Text>
                  <TextInput
                  style={[styles.textSecondary, styles.questionInputText]}
                  value={item.question}
                  editable={false}
                  onChangeText={text => setInputQuestionValue(text)}
                  />
                </View>
                <View style={styles.questionChoices}>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>A: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    placeholder='Type text here for A...'
                    value={item.A}
                    editable={false}
                    onChangeText={text => setInputAValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>B: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.B}
                    editable={false}
                    onChangeText={text => setInputBValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>C: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.C}
                    editable={false}
                    onChangeText={text => setInputCValue(text)}
                    />
                  </View>
                  <View style={styles.choiceLetter}>
                    <Text style={styles.textPrimary}>D: </Text>
                    <TextInput
                    style={[styles.textSecondary, styles.choiceInputField]}
                    value={item.D}
                    editable={false}
                    onChangeText={text => setInputDValue(text)}
                    />
                  </View>
                </View>
              </View>
    }
  }

  const resetInputValues = () => {
    setInputQuestionValue('');
    setInputAValue('');
    setInputBValue('');
    setInputCValue('');
    setInputDValue('');
  }

  const addNewQuestionToken = () => {
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
      "id": id,
      "question": question,
      "A":choiceA,
      "B":choiceB,
      "C":choiceC,
      "D":choiceD,
    }

    addNewQuizToken(newQuizToken);
    resetInputValues();
    console.log(quizToken)
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
          {/* <View style={styles.questionCard}
          key={sampleQuestionToken.id}
          onPress={()=> editCard(id)}
          >
            <View style={styles.question}>
              <Text style={[styles.questionText, styles.textPrimary]}>Question: </Text>
              <TextInput
              style={[styles.textSecondary, styles.questionInputText]}
              placeholder='Type the question here...'
              value={inputQuestionValue}
              onChangeText={text => setInputQuestionValue(text)}
              />
            </View>
            <View style={styles.questionChoices}>
              <View style={styles.choiceLetter}>
                <Text style={styles.textPrimary}>A: </Text>
                <TextInput
                style={[styles.textSecondary, styles.choiceInputField]}
                placeholder='Type text here for A...'
                value={inputAValue}
                onChangeText={text => setInputAValue(text)}
                />
              </View>
              <View style={styles.choiceLetter}>
                <Text style={styles.textPrimary}>B: </Text>
                <TextInput
                style={[styles.textSecondary, styles.choiceInputField]}
                placeholder='Type text here for B...'
                value={inputBValue}
                onChangeText={text => setInputBValue(text)}
                />
              </View>
              <View style={styles.choiceLetter}>
                <Text style={styles.textPrimary}>C: </Text>
                <TextInput
                style={[styles.textSecondary, styles.choiceInputField]}
                placeholder='Type text here for C...'
                value={inputCValue}
                onChangeText={text => setInputCValue(text)}
                />
              </View>
              <View style={styles.choiceLetter}>
                <Text style={styles.textPrimary}>D: </Text>
                <TextInput
                style={[styles.textSecondary, styles.choiceInputField]}
                placeholder='Type text here for D...'
                value={inputDValue}
                onChangeText={text => setInputDValue(text)}
                />
              </View>
            </View>
          </View> */}
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
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  editButton: {
    backgroundColor: "#9EC6F3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#9EC6F3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
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
  }
})