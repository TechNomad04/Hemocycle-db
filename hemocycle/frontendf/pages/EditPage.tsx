import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { use, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { CONFIG } from "../config";

function EditPage({ route }: any) {
  const { patientid, cncid, id, n, g, a, c, o, onUpdate } = route.params;

  const [age, setAge] = useState<string>(a.toString());
  const [category, setCategory] = useState<string>(c);
  const [others, setothers] = useState<string>(o);
  const [updated, setUpdated] = useState<boolean>(false);

  const update = async () => {
    if (!age || !category) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    try {
      const response = await axios.patch(`http://${CONFIG.ip}:5000/edit`, { age, category, others, id });
      console.log(response.data);

      const updatedUser = {
        _id: id,
        name: n,
        age: Number(age),
        gender: g,
        category: category,
        others: others,
        patientid,
        cncid,
      };

      onUpdate?.(updatedUser);
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
        <Text style={styles.itemText}>Patient Id: {patientid}</Text>
        <Text style={styles.itemText}>CNC Id: {cncid}</Text>
        <Text style={styles.itemText}>Name: {n}</Text>
        <Text style={styles.itemText}>Age: {updated ? age : a}</Text>
        <Text style={styles.itemText}>Gender: {g}</Text>
        <Text style={styles.itemText}>Others: {others}</Text>
        <Text style={styles.itemText}>Category: {updated ? category : c}</Text>
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

      <TextInput
        placeholder="Age"
        style={styles.input}
        value={others}
        onChangeText={a => setothers(a)}
      />

      <TouchableOpacity style={styles.button} onPress={update}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1e7db",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#E07A4B",
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    color: "#E07A4B",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#e07a4b32",
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E07A4B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: 320,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E07A4B",
    marginBottom: 4,
  },
  picker: {
    width: 300,
    height: 50,
    marginVertical: 8,
    borderColor: "#E07A4B",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    color: "#E07A4B",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#e07a4b32",
  },
  button: {
    backgroundColor: "#FA9359",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 10,
    width: 200,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,

    borderWidth: 1,
    borderColor: "#E07A4B",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditPage;
