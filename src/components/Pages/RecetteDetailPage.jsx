import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { chargerRecette } from "../../api/recettes";
import { useFavorisStore } from "../../store/FavorisStore";
import RecetteDetail from "../RecetteDetail";
import Chargement from "../Utils/Chargement";
import Erreur from "../Utils/Error";

function retour() {
  if (router.canGoBack()) router.back();
  else router.replace("/recettes");
}

export default function RecetteDetailPage({ id }) {
  const idsFavoris = useFavorisStore((state) => state.idsFavoris);
  const basculerFavori = useFavorisStore((state) => state.basculerFavori);

  const [recette, setRecette] = useState(null);
  const [statut, setStatut] = useState("chargement");
  const [erreur, setErreur] = useState(null);
  const [essai, setEssai] = useState(0);

  useEffect(() => {
    let ignorer = false;
    chargerRecette(id)
      .then((donnees) => {
        if (ignorer) return;
        setRecette(donnees);
        setStatut("succes");
      })
      .catch((e) => {
        if (ignorer) return;
        setErreur(e.message);
        setStatut(e.message === "introuvable" ? "introuvable" : "erreur");
      });
    return () => {
      ignorer = true;
    };
  }, [id, essai]);

  if (statut === "chargement") return <Chargement />;

  if (statut === "erreur") {
    return (
      <Erreur
        message={erreur}
        onRetry={() => {
          setStatut("chargement");
          setEssai((n) => n + 1);
        }}
      />
    );
  }

  if (statut === "introuvable") {
    return (
      <SafeAreaView style={styles.centre}>
        <View style={styles.centre}>
          <Text style={styles.titre}>Recette introuvable</Text>
          <Text>Aucune recette ne correspond à « {id} ».</Text>
          <Pressable style={styles.bouton} onPress={retour}>
            <Text style={styles.boutonTexte}>Retour aux recettes</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: recette.titre,
          headerRight: () => (
            <Pressable hitSlop={10} onPress={() => basculerFavori(recette.id)}>
              <Text style={styles.coeur}>
                {idsFavoris.includes(recette.id) ? "♥" : "♡"}
              </Text>
            </Pressable>
          ),
        }}
      />
      <RecetteDetail recette={recette} />
    </>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 16,
  },
  titre: { fontSize: 18, fontWeight: "bold" },
  bouton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  boutonTexte: { color: "#fff", fontWeight: "bold" },
  coeur: { fontSize: 24, color: "#e0245e" },
});
