import {View, TouchableOpacity, Text, StyleSheet} from "react-native"

function Part({navigation, route}: any) {
    const id = route.params.id
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Conjunctiva'})} style={styles.button}>
                <Text>Conjunctiva</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Fingernails'})} style={styles.button}>
                <Text>Fingernails</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Tongue'})} style={styles.button}>
                <Text>Tongue</Text>
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
    button: {
        backgroundColor: 'pink'
    }
})

export default Part