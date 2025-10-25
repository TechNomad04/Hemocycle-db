import {View, TouchableOpacity, Text, StyleSheet} from "react-native"

function Part({navigation, route}: any) {
    const id = route.params.id
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Conjunctiva'})} style={styles.button}>
                <Text style={styles.buttonText}>Conjunctiva</Text> 
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Fingernails'})} style={styles.button}>
                <Text style={styles.buttonText}>Fingernails</Text> 
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate('Upload', {id, part:'Tongue'})} style={styles.button}>
                <Text style={styles.buttonText}>Tongue</Text> 
            </TouchableOpacity>
        </View>
    )
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,               
    borderColor: "#ef7a44ff", 
    width: 200,
    },
    buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
})

export default Part