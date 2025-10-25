import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { CONFIG } from '../config';

function EditPage({ route }: any) {
  const { id, n, g, a, c, onUpdate } = route.params;

  const [age, setAge] = useState<string>(a.toString());
  const [category, setCategory] = useState<string>(c);
  const [updated, setUpdated] = useState<boolean>(false); // state to track update

  const update = async () => {
    if (!age || !category) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    try {
      const response = await axios.patch(`http://${CONFIG.ip}:5000/edit`, { age, category, id });
      console.log(response.data);

      const updatedUser = {
        _id: id,
        name: n,
        age: Number(age),
        gender: g,
        category: category,
      };

      onUpdate?.(updatedUser)

      setUpdated(true);
      Alert.alert("Success", "User updated successfully");
    } catch (err: any) {
      console.log(err.message);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>User Id: {id}</Text>
        <Text>Name: {n}</Text>
        <Text>Age: {updated ? age : a}</Text>
        <Text>Gender: {g}</Text>
        <Text>Category: {updated ? category : c}</Text>
      </View>

      <TextInput
        placeholder="Age"
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={a => setAge(a)}
      />

      <Picker
        style={styles.picker}
        selectedValue={category}
        onValueChange={(cat) => setCategory(cat)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Non-Anemic" value="Non-Anemic" />
        <Picker.Item label="Mild" value="Mild" />
        <Picker.Item label="Severe" value="Severe" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={update}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  picker: {
    width: 300,
    height: 50,
  },
  button: {
    backgroundColor: 'pink',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 10,
    borderRadius: 5,
    width: 120,
  },
});

export default EditPage;
