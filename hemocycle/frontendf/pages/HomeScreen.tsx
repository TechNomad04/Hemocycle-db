import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import axios from "axios"
import { useState, useEffect } from "react"

function HomeScreen ({navigation}:any) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('New record')} style={styles.button}>
                <Text>New Record</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Data')} style={styles.button}>
                <Text>Data</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor:'pink'
    }
})

export default HomeScreen