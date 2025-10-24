import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import {CONFIG} from '../config'

type recordType = {
    name: string,
    age: number,
    gender: string,
    category: string,
    _id: string
}

function Data ({navigation}:any) {
    const [data, setData] = useState<recordType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://${CONFIG.ip}:5000/fetchdata`)
                console.log(response.data)
                setData(response.data.users)

            } catch (err:any) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    const deleteEntry = async(id:string) => {
        try {
            const response = await axios.delete(`http://${CONFIG.ip}:5000/deleteRecord`, {
                data: {id}
            })
            console.log(response.data)
        } catch(err:any) {
            console.log(err.message)
        }
    }

    const renderItems = ({item}: {item: recordType}) => (
        <View style={styles.item}>
            <Text>User Id: {item._id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Category: {item.category}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Part', {id: item._id})}>
                <Text>Uploads</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => deleteEntry(item._id)}>
                <Text>Delete Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit', {
                id: item._id,
                n: item.name,
                a: item.age,
                g: item.gender,
                c: item.category
            })}>
                <Text>Edit</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
            <FlatList
            data={data}
            renderItem={renderItems}
            />
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  button: {
        backgroundColor:'pink'
    }
})

export default Data;