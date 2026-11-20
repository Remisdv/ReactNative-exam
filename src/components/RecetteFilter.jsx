import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { rechercherParCategorie } from "../api/recettes";
import { CATEGORIES } from "../data/recettes";

// Boutons de catégorie + recherche avec rechercherParCategorie.
// onChange reçoit { categorie, resultats } :
//   - resultats = null    → recherche en cours (ou « Toutes » : la page prend la liste du store)
//   - resultats = tableau → les recettes de la catégorie
// ⚠ Passer directement un setter de useState : <RecetteFilter onChange={setFiltre} />
//   (une fonction fléchée recréée à chaque rendu relancerait l'effet en boucle)
export default function RecetteFilter({ onChange }) {
  const [categorie, setCategorie] = useState("Toutes");

  useEffect(() => {
    if (categorie === "Toutes") return; // « Toutes » = la liste du store

    // Chaque exécution de l'effet a SON propre "perimee"
    let perimee = false;

    // Délai aléatoire : la réponse d'une ancienne catégorie peut arriver après la nouvelle
    rechercherParCategorie(categorie).then((resultats) => {
      if (perimee) return; // réponse tardive : on l'ignore
      onChange({ categorie, resultats });
    });

    // Nettoyage : appelé AVANT de relancer l'effet quand la catégorie change
    return () => {
      perimee = true;
    };
  }, [categorie, onChange]);

  function choisir(nouvelleCategorie) {
    // Même catégorie : l'effet ne se relancerait pas, on ne touche à rien
    if (nouvelleCategorie === categorie) return;
    setCategorie(nouvelleCategorie);
    // On vide tout de suite : l'écran n'affiche plus l'ancienne catégorie pendant la recherche
    onChange({ categorie: nouvelleCategorie, resultats: null });
  }

  return (
    <View style={styles.rangee}>
      {["Toutes", ...CATEGORIES].map((c) => (
        <Pressable
          key={c}
          onPress={() => choisir(c)}
          style={[styles.bouton, categorie === c && styles.boutonActif]}
        >
          <Text style={categorie === c ? styles.texteActif : styles.texte}>{c}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rangee: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  bouton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  boutonActif: { backgroundColor: "#222" },
  texte: { color: "#222" },
  texteActif: { color: "#fff" },
});
