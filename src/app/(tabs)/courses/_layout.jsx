import { Stack } from "expo-router";

// Pile de l'onglet Courses : un seul écran, mais la Stack donne l'en-tête « Mes courses »
export default function CoursesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Mes courses" }} />
    </Stack>
  );
}
