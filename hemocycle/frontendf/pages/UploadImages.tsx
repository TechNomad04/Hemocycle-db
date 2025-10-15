import { View, Image, Button, StyleSheet } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { useState } from "react";

function UploadImages() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        });

        const uri = result.assets?.[0]?.uri ?? null;
        if (uri) {
        setImageUri(uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick Image from Gallery" onPress={pickImage} />

            {imageUri && (
                <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 15,
        marginTop: 20,
    },
})

export default UploadImages