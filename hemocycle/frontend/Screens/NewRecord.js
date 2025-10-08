import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { useState } from "react";
import CONFIG from "../config";

export default function NewRecord({navigation}) {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('Female')
    const [age, setAge] = useState('')

    const addRecord = async() => {
        try {
            const response = await axios.post(`http://${CONFIG.IP}:5000/addinfo/`, {
                name,
                gender,
                age
            })
            console.log(response.data)
            navigation.navigate("Uploads", {name, age, gender})
        } catch(err) {
            console.log(err.message)
        }
    }
    return (
        <View style={styles.container}>
            <Text>Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
            />
            <Text>Age</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            />
            <Picker style={styles.picker} selectedValue={gender} onValueChange={(gen)=>setGender(gen)}>
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Other" value="other" />
            </Picker>


            <TouchableOpacity style={styles.submit} onPress={addRecord}>
                <Text>Upload</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    picker: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    submit: {
        backgroundColor: 'pink',
        padding: 15
    }
})