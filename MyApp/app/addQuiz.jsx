import { View, Text, FlatList, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useCallback } from 'react'
import { webStyles, mobileStyles } from '@/components/styles/addQuizStyles'
import { useQuizForm } from '@/hooks/useQuizForm'
import CustomDialog  from '@/components/modal/customModal'

const addQuiz = () => {
  const styles = Platform.OS === 'web' ? webStyles : mobileStyles;

  const { 
    inputTitleValue, 
    setInputTitleValue,
    quizToken,
    renderItem,
    addNewQuestionToken,
    quizTokenBinding,
    tryPrint,
    goToQuizMenu,
    renderHeader,
    dialogVisible, setDialogVisible,
    dialog,        setDialog,
    showDialog,    hideDialog,
    titleDialog
   } = useQuizForm();


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
       keyboardVerticalOffset={Platform.OS === 'android' ? -80 : 0}
    >
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Link
        href='/quizMenu'
        style={styles.backButton}
        asChild
        >
        <TouchableOpacity >
          <Text style={[styles.textPrimary, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>
        </Link>
        {renderHeader()}
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
            keyExtractor={quizToken => quizToken.id.toString()}
            keyboardShouldPersistTaps="handled"
            />
        </View>
        <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.addNewButton} onPress={()=>{addNewQuestionToken()}}>
              <Text style={[styles.textPrimary, styles.saveButtonText]}>Add new</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={()=>{quizTokenBinding(inputTitleValue, quizToken); tryPrint(); goToQuizMenu();}}>
              <Text style={[styles.textPrimary, styles.saveButtonText]}> Save </Text>
            </TouchableOpacity>
        </View>
      </View>
      <CustomDialog
        visible={dialogVisible}
        hideDialog={hideDialog}
        title={titleDialog}
        content={dialog}
        onConfirm={hideDialog}
        oneBtn={true}
      />
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default addQuiz
