import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from '../config.ts';

function ViewImages({ route }: any) {
  const id = route.params.id;
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`http://${CONFIG.ip}:5000/images`, { id });
        setImages(response.data.images);
        console.log(response.data.images);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const deleteImage = async (item:string) => {
    try {
        const response = await axios.delete(`http://${CONFIG.ip}:5000/delimage`, {data: {imageurl: item, id}})
        console.log(response.data)
    } catch(err: any) {
        console.log(err.message)
    }
  }

  if (loading) return <Text>Loading...</Text>;

  if (images.length === 0) return <Text>No images uploaded yet.</Text>;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View>
            <Image
                source={{ uri: item }}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={() => deleteImage(item)}>
                <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'pink'
  }
});

export default ViewImages;
