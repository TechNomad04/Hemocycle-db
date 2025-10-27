import { View, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from "../config";

type recordType = {
  name: string;
  age: number;
  gender: string;
  category: string;
  _id: string;
};

function Data({ navigation }: any) {
  const [data, setData] = useState<recordType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://${CONFIG.ip}:5000/fetchdata`);
        console.log(response.data);
        setData(response.data.users);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const deleteEntry = async (id: string) => {
    try {
      setDeleting(id);
      const response = await axios.delete(`http://${CONFIG.ip}:5000/deleteRecord`, {
        data: { id },
      });
      setData(prev => prev.filter(i => i._id !== id));
      console.log(response.data);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const renderItems = ({ item }: { item: recordType }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>User Id: {item._id}</Text>
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Age: {item.age}</Text>
      <Text style={styles.itemText}>Gender: {item.gender}</Text>
      <Text style={styles.itemText}>Category: {item.category}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Part", { id: item._id })}
      >
        <Text style={styles.buttonText}>Uploads</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => deleteEntry(item._id)}
      >
        {deleting === item._id ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Delete</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Edit", {
            id: item._id,
            n: item.name,
            a: item.age,
            g: item.gender,
            c: item.category,
            onUpdate: (updatedUser: recordType) => {
              setData(prev =>
                prev.map(u => (u._id === updatedUser._id ? updatedUser : u))
              );
            },
          })
        }
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList data={data} renderItem={renderItems} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1e7db",
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E07A4B",
  },
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E07A4B",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#FA9359",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,

    borderWidth: 1,
    borderColor: "#E07A4B",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E07A4B",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Data;
