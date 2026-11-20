import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
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
  const [filtre, setFiltre] = useState({
    categorie: "Toutes",
    resultats: null,
  });

  function changerMode(nouveauMode) {
    choisirMode(nouveauMode);
    setMode(nouveauMode);
    setFiltre({ categorie: "Toutes", resultats: null });
    charger();
  }

  const liste = filtre.categorie === "Toutes" ? recettes : filtre.resultats;

  function etatVide() {
    if (statut === "inactif" || statut === "chargement") return <Chargement />;
    if (statut === "erreur")
      return <Erreur message={erreur} onRetry={charger} />;
    if (liste === null) return <Chargement texte="Recherche..." />;
    return <Text style={styles.vide}>Aucune recette.</Text>;
  }

  return (
    <SafeAreaView style={styles.ecran}>
      <FlatList
        style={styles.ecran}
        contentContainerStyle={styles.contenu}
        contentInsetAdjustmentBehavior="automatic"
        data={statut === "succes" && liste ? liste : []}
        keyExtractor={(recette) => recette.id}
        ListHeaderComponent={
          <View>
            <DemoComponent mode={mode} onChange={changerMode} />
            <RecetteFilter key={mode} onChange={setFiltre} />
          </View>
        }
        ListEmptyComponent={etatVide()}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: "#f2f2f2" },
  contenu: { padding: 12 },
  vide: { textAlign: "center", marginTop: 20 },
});
