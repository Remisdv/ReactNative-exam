import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { choisirMode, modeActuel } from "../../api/recettes";
import { useFavorisStore } from "../../store/FavorisStore";
import { useRecettes } from "../../store/RecetteStore";
import DemoComponent from "../DemoComponent";
import RecetteCard from "../RecetteCard";
import RecetteFilter from "../RecetteFilter";
import Chargement from "../Utils/Chargement";
import Erreur from "../Utils/Error";

export default function RecettesPage() {
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
      <DemoComponent mode={mode} onChange={changerMode} />

      {/* key={mode} : changer de mode recrée le filtre, qui repart sur « Toutes » */}
      <RecetteFilter key={mode} onChange={setFiltre} />

      {contenu()}
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, padding: 12, backgroundColor: "#f2f2f2" },
  vide: { textAlign: "center", marginTop: 20 },
});
