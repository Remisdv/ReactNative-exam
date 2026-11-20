import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function RecetteDetail({ recette }) {
  if (!recette) {
    return <Text style={styles.contenu}>Recette introuvable</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.contenu}>
      {recette.image ? (
        <Image source={recette.image} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.pasDImage]}>
          <Text>Pas de photo</Text>
        </View>
      )}

      <Text style={styles.titre}>{recette.titre}</Text>
      <Text>
        {recette.categorie} · {recette.duree} min · {recette.difficulte}
      </Text>

      <Text style={styles.sousTitre}>Ingrédients</Text>
      {recette.ingredients.map((ingredient) => (
        <Text key={ingredient}>- {ingredient}</Text>
      ))}

      <Text style={styles.sousTitre}>Étapes</Text>
      {recette.etapes.map((etape, index) => (
        <Text key={index}>
          {index + 1}. {etape}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenu: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  pasDImage: {
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  sousTitre: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
});
