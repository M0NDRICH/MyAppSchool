import { StyleSheet } from "react-native";

export const webStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF1D5',
  },
  card: {
    width: '50%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textDescription: {
    textAlign: 'center',
    textIndent: 0,
    color: '#3C2F60',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#9EC6F3',
    width: 125,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  textPrimary: {
    color: '#3C2F60',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export const mobileStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF1D5',
  },
  card: {
    marginTop: 20,
    width: '100%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  monLogo: {
    width: 200,
    height: 80
  },
  brcLogo: {
    width: 300,
    height: 150,
  },
  textPrimary: {
    color: '#3C2F60',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textDescription: {
    paddingHorizontal: 20,
    textAlign: 'center',
    textIndent: 0,
    color: '#3C2F60',
    fontWeight: '500',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#9EC6F3',
    width: 125,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});