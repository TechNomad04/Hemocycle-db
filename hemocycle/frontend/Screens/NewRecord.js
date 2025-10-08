import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Picker } from '@react-native-picker/picker';

export default function NewRecord() {
    return (
        <View style={styles.container}>
            <Text>Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Name"
            />
            <Text>Age</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Age"
            keyboardType="numeric"
            />
            <Picker style={styles.picker}>
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Other" value="other" />
            </Picker>

            <TouchableOpacity style={styles.submit}>
                <Text>Submit</Text>
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