import { View, Image, TouchableOpacity, Text, StyleSheet, PermissionsAndroid, Alert } from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { useState } from "react";
import axios from "axios";
import { CONFIG } from "../config";

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
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export default function UploadImages({ navigation, route }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const id = route.params.id;
  const part = route.params.part;

  async function uploadToServer(uri: string, fileName: string, id: string) {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: fileName,
      type: "image/jpeg",
    } as any);
    formData.append("id", id);
    formData.append("part", part);

    try {
      await axios.post(`http://${CONFIG.ip}:5000/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success", "Image uploaded to server");
    } catch (err) {
      Alert.alert("Error", "Failed to upload image");
      console.log(err);
    }
  }

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 });
    const uri = result.assets?.[0]?.uri ?? null;
    const name = result.assets?.[0]?.fileName ?? "image.jpg";
    if (uri) {
      setImageUri(uri);
      await uploadToServer(uri, name, id);
    }
  };

  const captureFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Camera permission is required.");
      return;
    }
    const result = await launchCamera({ mediaType: "photo", saveToPhotos: true, quality: 1 });
    const uri = result.assets?.[0]?.uri ?? null;
    const name = result.assets?.[0]?.fileName ?? "image.jpg";
    if (uri) {
      setImageUri(uri);
      await uploadToServer(uri, name, id);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('View Images', { id, part })}>
        <Text style={styles.buttonText}>View Images</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={captureFromCamera}>
        <Text style={styles.buttonText}>Capture from Camera</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1e7db"
  },
  button: {
    backgroundColor: "#FA9359",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 220,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,

    borderWidth: 1,
    borderColor: "#E07A4B"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  image: { 
    width: 250, 
    height: 250,
    borderRadius: 15, 
    marginTop: 20,
  },
});
