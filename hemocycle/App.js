import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export default function App() {
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter your name" value={text} onChangeText={setText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})