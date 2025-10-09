import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native"
import { StyleSheet } from "react-native"
import axios from "axios"
import CONFIG from "../config"
import { useEffect, useState } from "react"

export default function HomeScreen ({navigation}) {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {fetchData()}, [])

    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text>Name: {item.name}</Text>
        <Text>Age: {item.age}</Text>
        <Text>Gender: {item.gender}</Text>
      </View>
    )


    const fetchData = async() => {
        try {
            const response = await axios.get(`http://${CONFIG.IP}:5000/fetchData`)
            console.log(response.data.users)
            setData(response.data.users)
        } catch (err) {
            console.log(err.message)
        } finally {
          setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("New Record")}>
            <Text style={styles.buttonText}>New Record</Text>
            </TouchableOpacity>
            {loading ? (<ActivityIndicator size="large" color="blue"/>):(
              <FlatList data={data} 
            renderItem={renderItem}
            style={styles.list}/>
            )}
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
  },
  list: {

  }
})