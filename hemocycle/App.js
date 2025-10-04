import { useState } from "react";
import { TextInput, View, StyleSheet, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(!permissionResult.granted) {
      alert('Permission not granted');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if(!result.canceled)
      setImage(result.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter your name" value={text} onChangeText={setText}/>
      <Button title="Upload Picture" onPress={pickImage}/>
      {image && <Image source={{uri: image}} style={styles.image}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
})