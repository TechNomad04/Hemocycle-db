import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from '../config';

function ViewImages({ route }: any) {
  const id = route.params.id;
  const part = route.params.part;
  const [images, setImages] = useState<string[]>([]);
  const [imageId, setImageId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`http://${CONFIG.ip}:5000/images`, { id, part });
        setImages(response.data.images);
        setImageId(response.data.imageIds);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const deleteImage = async (item: string, index: number) => {
    try {
      setDeleting(item);
      await axios.delete(`http://${CONFIG.ip}:5000/delimage`, { data: { imId: item, id } });

      // remove deleted image from state
      setImages(prev => prev.filter((_, i) => i !== index));
      setImageId(prev => prev.filter((_, i) => i !== index));
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (images.length === 0) return <Text>No images uploaded yet.</Text>;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteImage(imageId[index], index)}
              disabled={deleting === imageId[index]}
            >
              {deleting === imageId[index] ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Delete</Text>
              )}
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
    backgroundColor: 'pink',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
  }
});

export default ViewImages;

