import { StyleSheet } from "react-native"

export const webStyles = StyleSheet.create({
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

export const mobileStyles = StyleSheet.create({
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