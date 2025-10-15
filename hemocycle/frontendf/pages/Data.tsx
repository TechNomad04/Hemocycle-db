import { View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import {CONFIG} from '../config'

type recordType = {
    name: string,
    age: number,
    gender: string,
    category: string
}

function Data () {
    const [data, setData] = useState<recordType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://${CONFIG.ip}/fetchdata/`)
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

    const renderItems = ({item}: {item: recordType}) => (
        <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Gender: {item.category}</Text>
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
})

export default Data;