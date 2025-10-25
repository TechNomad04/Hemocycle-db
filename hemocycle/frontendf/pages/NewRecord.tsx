import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import axios from "axios";
import { CONFIG } from "../config";

function NewRecord({ navigation }: any) {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [category, setCategory] = useState<string>("Non-Anemic");
  const [id, setid] = useState<string>("");

  const submitinfo = async () => {
    try {
      const response = await axios.post(`http://${CONFIG.ip}:5000/addinfo/`, {
        name,
        age,
        gender,
        category
      });
      console.log(response.data);
      setid(response.data.user._id);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Your Name"
        placeholderTextColor="#E07A4B"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Enter Your Age"
        placeholderTextColor="#E07A4B"
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      <Picker
        style={styles.picker}
        selectedValue={gender}
        onValueChange={(gen) => setGender(gen)}
        itemStyle={{ color: "#E07A4B", fontWeight: "bold", fontSize: 16 }}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(cat) => setCategory(cat)}
        itemStyle={{ color: "#E07A4B", fontWeight: "bold", fontSize: 16 }}
      >
        <Picker.Item label="Non-Anemic" value="Non-Anemic" />
        <Picker.Item label="Mild" value="Mild" />
        <Picker.Item label="Severe" value="Severe" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={submitinfo}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Part", { id })}>
        <Text style={styles.buttonText}>Upload Images</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: "#e07a4b32",
    height: 50,
    width: 300,
    borderColor: "#E07A4B",
    borderWidth: 0.5,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#E07A4B",
    fontWeight: "bold",
    fontSize: 16
  },
  picker: {
    width: 300,
    marginVertical: 8,
    borderColor: "#E07A4B",
    borderWidth: 0.5,
    borderRadius: 8,
    overflow: "hidden",
    color: "#E07A4B", 
    fontWeight: "bold", 
    fontSize: 16
  },
  button: {
    backgroundColor: "#FA9359",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
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
  }
});

export default NewRecord;
