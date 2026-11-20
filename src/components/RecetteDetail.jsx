import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useCourseStore } from "../store/CourseStore";

export default function RecetteDetail({ recette }) {
  // Les hooks AVANT le "if (!recette) return" : ils doivent être appelés à chaque rendu
  const ajouterIngredients = useCourseStore((state) => state.ajouterIngredients);
  const [message, setMessage] = useState(null);

  function ajouterAuxCourses() {
    const nombre = ajouterIngredients(recette.ingredients);
    setMessage(
      nombre === 0
        ? "Tous les ingrédients sont déjà dans les courses."
        : `${nombre} ingrédient(s) ajouté(s) aux courses.`
    );
  }

  if (!recette) {
    return <Text style={styles.contenu}>Recette introuvable</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.contenu} contentInsetAdjustmentBehavior="automatic">
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

      <Pressable style={styles.bouton} onPress={ajouterAuxCourses}>
        <Text style={styles.boutonTexte}>Ajouter les ingrédients aux courses</Text>
      </Pressable>
      {message ? <Text style={styles.message}>{message}</Text> : null}

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
  bouton: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  boutonTexte: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    marginTop: 6,
    color: "#666",
  },
});
