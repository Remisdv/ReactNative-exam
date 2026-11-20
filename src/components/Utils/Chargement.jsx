import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Chargement({ texte = "Chargement..." }) {
  return (
    <View style={styles.centre}>
      <ActivityIndicator size="large" />
      <Text>{texte}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
