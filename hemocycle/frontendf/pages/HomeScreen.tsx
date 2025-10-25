import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

function HomeScreen ({navigation}:any) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('New record')} style={styles.button}>
                <Text style={styles.buttonText}>New Record</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Data')} style={styles.button}>
                <Text style={styles.buttonText}>Data</Text> 
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
});

export default HomeScreen