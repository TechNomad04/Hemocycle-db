import { View, Image, Button, StyleSheet, PermissionsAndroid, Alert } from "react-native"
import { launchImageLibrary, launchCamera } from "react-native-image-picker"
import { useState } from "react"

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
  } catch (err) {
    console.warn(err)
    return false
  }
}

export default function UploadImages() {
  const [imageUri, setImageUri] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 })
    const uri = result.assets?.[0]?.uri ?? null
    if (uri) setImageUri(uri)
  }

  const captureFromCamera = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert("Permission denied", "Camera permission is required.")
      return
    }

    const result = await launchCamera({
      mediaType: "photo",
      saveToPhotos: true,
      quality: 1,
    })

    const uri = result.assets?.[0]?.uri ?? null
    if (uri) setImageUri(uri)
  }

  return (
    <View style={styles.container}>
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
