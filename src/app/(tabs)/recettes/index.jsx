import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { choisirMode, MODES, modeActuel, rechercherParCategorie } from "../../../api/recettes";
import RecetteCard from "../../../components/RecetteCard";
import Chargement from "../../../components/Utils/Chargement";
import Erreur from "../../../components/Utils/Error";
import { useFavorisStore } from "../../../store/FavorisStore";
import { useRecettes } from "../../../store/RecetteStore";

const CATEGORIES = ["Toutes", "Entrée", "Plat", "Dessert"];

export default function Recettes() {
  const { recettes, statut, erreur, charger } = useRecettes();
  const idsFavoris = useFavorisStore((state) => state.idsFavoris);
  const basculerFavori = useFavorisStore((state) => state.basculerFavori);

  const [mode, setMode] = useState(modeActuel());
  const [categorie, setCategorie] = useState("Toutes");
  const [resultats, setResultats] = useState(null); // null = réponse de la catégorie pas encore arrivée

  // Catégorie : le délai de l'API est aléatoire, une réponse ancienne peut arriver après la nouvelle.
  // Le nettoyage marque la requête précédente comme périmée : seule la dernière catégorie s'affiche.
  useEffect(() => {
    if (categorie === "Toutes") return; // « Toutes » = la liste du store (qui gère les 4 états)
    let ignorer = false;
    rechercherParCategorie(categorie).then((donnees) => {
      if (!ignorer) setResultats(donnees);
    });
    return () => {
      ignorer = true;
    };
  }, [categorie]);

  function choisirCategorie(nouvelleCategorie) {
    setResultats(null); // affiche « Recherche... » jusqu'à la réponse
    setCategorie(nouvelleCategorie);
  }

  function changerMode(nouveauMode) {
    choisirMode(nouveauMode);
    setMode(nouveauMode);
    setCategorie("Toutes");
    charger();
  }

  const liste = categorie === "Toutes" ? recettes : resultats;

  function contenu() {
    if (statut === "inactif" || statut === "chargement") return <Chargement />;
    if (statut === "erreur") return <Erreur message={erreur} onRetry={charger} />;
    if (liste === null) return <Chargement texte="Recherche..." />;
    return (
      <FlatList
        data={liste}
        keyExtractor={(recette) => recette.id}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={<Text style={styles.vide}>Aucune recette.</Text>}
        renderItem={({ item }) => (
          <View>
            <RecetteCard
              titre={item.titre}
              categorie={item.categorie}
              duree={item.duree}
              difficulte={item.difficulte}
              image={item.image}
              onPress={() => router.push(`/recettes/${item.id}`)}
            />
            <Pressable
              style={styles.coeur}
              hitSlop={10}
              onPress={() => basculerFavori(item.id)}
            >
              <Text style={styles.coeurTexte}>{idsFavoris.includes(item.id) ? "♥" : "♡"}</Text>
            </Pressable>
          </View>
        )}
      />
    );
  }

  return (
    <View style={styles.ecran}>
      <Text style={styles.label}>{"Mode de l'API (démo)"}</Text>
      <View style={styles.rangee}>
        {MODES.map((m) => (
          <Pressable
            key={m}
            onPress={() => changerMode(m)}
            style={[styles.bouton, mode === m && styles.boutonActif]}
          >
            <Text style={mode === m ? styles.texteActif : styles.texte}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.rangee}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => choisirCategorie(c)}
            style={[styles.bouton, categorie === c && styles.boutonActif]}
          >
            <Text style={categorie === c ? styles.texteActif : styles.texte}>{c}</Text>
          </Pressable>
        ))}
      </View>

      {contenu()}
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, padding: 12, backgroundColor: "#f2f2f2" },
  label: { fontSize: 12, color: "#666", marginBottom: 4 },
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
  vide: { textAlign: "center", marginTop: 20 },
  coeur: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  coeurTexte: { fontSize: 22, color: "#e0245e" },
});
