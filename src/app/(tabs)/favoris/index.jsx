import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import RecetteCard from "../../../components/RecetteCard";
import Chargement from "../../../components/Utils/Chargement";
import Erreur from "../../../components/Utils/Error";
import { useFavorisStore } from "../../../store/FavorisStore";
import { useRecettes } from "../../../store/RecetteStore";

export default function Favoris() {
  const { recettes, statut, erreur, charger } = useRecettes();
  const idsFavoris = useFavorisStore((state) => state.idsFavoris);
  const basculerFavori = useFavorisStore((state) => state.basculerFavori);

  // Le store ne garde que les ids : on retrouve les recettes correspondantes
  const favoris = recettes.filter((recette) => idsFavoris.includes(recette.id));

  if (statut === "inactif" || statut === "chargement") return <Chargement />;
  if (statut === "erreur") return <Erreur message={erreur} onRetry={charger} />;

  return (
    <View style={styles.ecran}>
      <FlatList
        data={favoris}
        keyExtractor={(recette) => recette.id}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={
          <Text style={styles.vide}>Aucun favori. Touchez ♡ sur une recette.</Text>
        }
        renderItem={({ item }) => (
          <View>
            <RecetteCard
              titre={item.titre}
              categorie={item.categorie}
              duree={item.duree}
              difficulte={item.difficulte}
              image={item.image}
              onPress={() => router.push(`/favoris/${item.id}`)}
            />
            <Pressable style={styles.coeur} hitSlop={10} onPress={() => basculerFavori(item.id)}>
              <Text style={styles.coeurTexte}>♥</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, padding: 12, backgroundColor: "#f2f2f2" },
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
