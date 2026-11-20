import { Stack } from "expo-router";

export default function RecettesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Recettes" }} />
      <Stack.Screen name="[id]" options={{ title: "Fiche" }} />
    </Stack>
  );
}
