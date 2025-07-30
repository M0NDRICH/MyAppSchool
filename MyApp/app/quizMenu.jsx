import { View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { data } from '@/data/quizzes';
import React,{ useState, useEffect } from 'react'

const home = () => {
  const [quizzes, setQuizzes] = useState(data);

  const renderItem = ({ item }) => (
    <Link
    href={{
      pathname: '/playQuiz',
      params: { id: item.id }
    }}
    style={[{ marginHorizontal: 'auto' }]}
    asChild
    >
    <Pressable style={styles.quizToken}>
      <Text style={styles.quizText}>{item.title}</Text>
      <Text style={styles.quizText}>Items: {item.questions.length}</Text>
    </Pressable>
    </Link>
  )

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Let's Play and Learn!</Text>
        </View>
        <View style={styles.midPart}>
          <FlatList
          style={styles.quizTokenContainer}
          data={quizzes}
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

const styles = StyleSheet.create({
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
  quizTokenContainer: {
    width: '100%',
  },
  quizToken: {
    width: '100%',
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