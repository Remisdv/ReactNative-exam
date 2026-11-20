import { StyleSheet, Text, View } from "react-native";

import Retry from "./Retry";

// "Erreur" et pas "Error" pour ne pas cacher le Error de JavaScript
export default function Erreur({ message, onRetry }) {
  return (
    <View style={styles.centre}>
      <Text style={styles.titre}>Une erreur est survenue</Text>
      <Text>{message}</Text>
      {onRetry ? <Retry onPress={onRetry} /> : null}
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
  titre: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
