import { useHeaderHeight } from "expo-router/react-navigation";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CourseForm from "../CourseForm";
import { useCourseStore } from "../../store/CourseStore";

export default function CoursesPage() {
  const articles = useCourseStore((state) => state.articles);
  const supprimerArticle = useCourseStore((state) => state.supprimerArticle);
  const hauteurEnTete = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.ecran}
      behavior="padding"
      enabled={Platform.OS === "android"}
      keyboardVerticalOffset={hauteurEnTete}
    >
      <CourseForm />

      <FlatList
        data={articles}
        keyExtractor={(article) => article}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        ListEmptyComponent={<Text style={styles.vide}>La liste de courses est vide.</Text>}
        renderItem={({ item }) => (
          <View style={styles.ligne}>
            <Text style={styles.article}>{item}</Text>
            <Pressable hitSlop={8} onPress={() => supprimerArticle(item)}>
              <Text style={styles.supprimer}>Supprimer</Text>
            </Pressable>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, padding: 12, backgroundColor: "#f2f2f2" },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  article: { flex: 1, fontSize: 16 },
  supprimer: { color: "#c00" },
  vide: { textAlign: "center", marginTop: 20 },
});
