import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RecetteCard({ titre, categorie, duree, difficulte, image, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {image ? (
        <Image source={image} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.pasDImage]}>
          <Text>Pas de photo</Text>
        </View>
      )}
      <Text style={styles.titre}>{titre}</Text>
      <Text>
        {categorie} · {duree} min · {difficulte}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 150,
  },
  pasDImage: {
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
});
