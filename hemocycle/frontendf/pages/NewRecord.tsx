import { View,TextInput, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import React from "react"

function NewRecord () {
    return (
       <View style={styles.container}>
        <TextInput placeholder="Enter Your Name" style={styles.input}/>
        <TextInput placeholder="Enter Your Age" style={styles.input} keyboardType="numeric"/>
        <Picker style={styles.picker}>
            <Picker.Item label="Male" value="Male"/>
            <Picker.Item label="Female" value="Female"/>
            <Picker.Item label="Other" value="Other"/>
        </Picker>
        <Picker style={styles.picker}>
            <Picker.Item label="Non-Anemic" value="Non-Anemic"/>
            <Picker.Item label="Mild" value="Mild"/>
            <Picker.Item label="Severe" value="Severe"/>
        </Picker>
        <TouchableOpacity style={styles.button}>
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
        backgroundColor: 'black'
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