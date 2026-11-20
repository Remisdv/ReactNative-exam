import { Stack } from "expo-router";

// Lien direct vers une fiche : la liste est placée en dessous,
// donc le bouton retour ramène à la liste
export const unstable_settings = {
  anchor: "index",
};

export default function RecettesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Recettes" }} />
      <Stack.Screen name="[id]" options={{ title: "Détail" }} />
    </Stack>
  );
}
