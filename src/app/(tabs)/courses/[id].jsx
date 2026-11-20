import { useLocalSearchParams } from "expo-router";
import RecetteDetail from "../../../components/RecetteDetail";

export default function DetailRecetteCourses() {
  const { id } = useLocalSearchParams();
  return <RecetteDetail id={id} />;
}
