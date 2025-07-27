import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TODO: Log in here</Text>
    </View>
  )
}

export default explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});