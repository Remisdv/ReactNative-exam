import { useLocalSearchParams } from "expo-router";
import RecetteDetail from "../../../components/RecetteDetail";

export default function DetailRecetteRecettes() {
  const { id } = useLocalSearchParams();
  return <RecetteDetail id={id} />;
}
