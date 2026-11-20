import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { choisirMode, modeActuel, MODES } from "../../../api/recettes";
import RecetteCard from "../../../components/RecetteCard";
import RecetteFilter from "../../../components/RecetteFilter";
import Chargement from "../../../components/Utils/Chargement";
import Erreur from "../../../components/Utils/Error";
import { useFavorisStore } from "../../../store/FavorisStore";
import { useRecettes } from "../../../store/RecetteStore";

export default function Recettes() {
  const { recettes, statut, erreur, charger } = useRecettes();
  const idsFavoris = useFavorisStore((state) => state.idsFavoris);
  const basculerFavori = useFavorisStore((state) => state.basculerFavori);

  const [mode, setMode] = useState(modeActuel());
  // Rempli par RecetteFilter (la recherche et la protection anti-réponses tardives sont dedans)
  const [filtre, setFiltre] = useState({ categorie: "Toutes", resultats: null });

  function changerMode(nouveauMode) {
    choisirMode(nouveauMode);
    setMode(nouveauMode);
    setFiltre({ categorie: "Toutes", resultats: null });
    charger();
  }

  // « Toutes » = la liste du store (qui gère les 4 états), sinon la réponse de la catégorie
  const liste = filtre.categorie === "Toutes" ? recettes : filtre.resultats;

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
          <RecetteCard
            titre={item.titre}
            categorie={item.categorie}
            duree={item.duree}
            difficulte={item.difficulte}
            image={item.image}
            onPress={() => router.push(`/recettes/${item.id}`)}
            estFavori={idsFavoris.includes(item.id)}
            onToggleFavori={() => basculerFavori(item.id)}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.ecran}>
      <Text style={styles.label}>{"Mode de l'API (démo)"}</Text>
      <View style={styles.rangee}>
        {MODES.map((m) => ( // enlever map
          <Pressable
            key={m}
            onPress={() => changerMode(m)}
            style={[styles.bouton, mode === m && styles.boutonActif]}
          >
            <Text style={mode === m ? styles.texteActif : styles.texte}>{m}</Text>
          </Pressable>
        ))}
      </View>

      {/* key={mode} : changer de mode recrée le filtre, qui repart sur « Toutes » */}
      <RecetteFilter key={mode} onChange={setFiltre} />

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
});
