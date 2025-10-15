import { View,TextInput, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import React from "react"
import { useState } from "react"
import axios from "axios"

function NewRecord () {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<string>('')
    const [gender, setGender] = useState<string>('Male')
    const [category, setCategory] = useState<string>('Non-Anemic')

    const submitinfo = async() => {
        try {
            const response = await axios.post('http://192.168.137.1:5000/addinfo/', {
                name,
                age,
                gender,
                category
            })
            console.log(response.data)
        } catch (err:any) {
            console.log(err.message)
        }
    }

    return (
       <View style={styles.container}>
        <TextInput placeholder="Enter Your Name" style={styles.input} value={name} onChangeText={text=>setName(text)}/>
        <TextInput placeholder="Enter Your Age" style={styles.input} keyboardType="numeric" value={age} onChangeText={text => setAge(text)}/>
        <Picker style={styles.picker} selectedValue={gender} onValueChange={(gen)=>setGender(gen)}>
            <Picker.Item label="Male" value="Male"/>
            <Picker.Item label="Female" value="Female"/>
            <Picker.Item label="Other" value="Other"/>
        </Picker>
        <Picker style={styles.picker} selectedValue={category} onValueChange={(cat)=>setCategory(cat)}>
            <Picker.Item label="Non-Anemic" value="Non-Anemic"/>
            <Picker.Item label="Mild" value="Mild"/>
            <Picker.Item label="Severe" value="Severe"/>
        </Picker>
        <TouchableOpacity style={styles.button} onPress={submitinfo}>
            <Text>Submit</Text>
        </TouchableOpacity>
       </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'black',
        borderWidth: 0.5,
        color: 'black'
    },
    picker: {
        width: 300
    },
    button: {
        backgroundColor: 'pink'
    }
})

export default NewRecord