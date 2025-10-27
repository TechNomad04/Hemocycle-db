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

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (images.length === 0) return <Text style={styles.loadingText}>No images uploaded yet.</Text>;

  return (
    <View style={styles.container} >
      <FlatList style={styles.container}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1e7db",
  },
  image: {
    width: 120,
    height: 120,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E07A4B",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    backgroundColor: "#FA9359",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 6,
    marginHorizontal: 8,
    borderRadius: 8,

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


export default ViewImages;

