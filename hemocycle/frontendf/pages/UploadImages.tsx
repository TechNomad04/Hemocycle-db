import { View, Image, Button, StyleSheet, PermissionsAndroid, Alert } from "react-native"
import { launchImageLibrary, launchCamera } from "react-native-image-picker"
import { useState } from "react"
import axios from "axios"
import { CONFIG } from '../config'

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "App needs camera access to take pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch {
    return false
  }
}

async function uploadToServer(uri: string, fileName: string, id: string) {
  const formData = new FormData()
  formData.append("file", {
    uri,
    name: fileName,
    type: "image/jpeg",
  } as any)
  formData.append("id", id)

  try {
    await axios.post(`http://${CONFIG.ip}:5000/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    Alert.alert("Success", "Image uploaded to server")
  } catch (err) {
    Alert.alert("Error", "Failed to upload image")
    console.log(err)
  }
}

export default function UploadImages({ navigation,route }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const id = route.params.id

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 })
    const uri = result.assets?.[0]?.uri ?? null
    const name = result.assets?.[0]?.fileName ?? "image.jpg"
    if (uri) {
      setImageUri(uri)
      await uploadToServer(uri, name, id)
    }
  }

  const captureFromCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert("Permission denied", "Camera permission is required.")
      return
    }
    const result = await launchCamera({ mediaType: "photo", saveToPhotos: true, quality: 1 })
    const uri = result.assets?.[0]?.uri ?? null
    const name = result.assets?.[0]?.fileName ?? "image.jpg"
    if (uri) {
      setImageUri(uri)
      await uploadToServer(uri, name, id)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="View Images" onPress={() => navigation.navigate('View Images', {id})}/>
      <View style={{ marginVertical: 10 }} />
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Capture from Camera" onPress={captureFromCamera} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  image: { width: 250, height: 250, borderRadius: 15, marginTop: 20 },
})
