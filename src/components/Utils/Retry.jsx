import { Pressable, StyleSheet, Text } from "react-native";

export default function Retry({ onPress }) {
  return (
    <Pressable style={styles.bouton} onPress={onPress}>
      <Text style={styles.texte}>Réessayer</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bouton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  texte: {
    color: "#fff",
    fontWeight: "bold",
  },
});
