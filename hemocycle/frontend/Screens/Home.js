import { View, TouchableOpacity, Text } from "react-native"
import { StyleSheet } from "react-native"

export default function HomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("New Record")}>
            <Text style={styles.buttonText}>New Record</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center'
  },
  button: {
    marginTop: 50,
    backgroundColor: 'pink',
    padding: 10,
  }
})