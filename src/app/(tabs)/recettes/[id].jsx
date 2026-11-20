import { useLocalSearchParams } from "expo-router";

import RecetteDetailPage from "../../../components/Pages/RecetteDetailPage";

export default function DetailRecette() {
  const { id } = useLocalSearchParams();
  return <RecetteDetailPage id={id} />;
}
