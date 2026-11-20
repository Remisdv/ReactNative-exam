import { useLocalSearchParams } from "expo-router";

import RecetteDetail from "../../../components/RecetteDetail";
import Chargement from "../../../components/Utils/Chargement";
import Erreur from "../../../components/Utils/Error";
import { useRecettes } from "../../../store/RecetteStore";

export default function DetailRecetteCourses() {
  const { id } = useLocalSearchParams();
  // Lien direct : le store est vide, useRecettes lance le chargement
  const { recettes, statut, erreur, charger } = useRecettes();

  if (statut === "erreur") return <Erreur message={erreur} onRetry={charger} />;
  if (statut !== "succes") return <Chargement />;

  const recette = recettes.find((r) => r.id === id);
  return <RecetteDetail recette={recette} />;
}
