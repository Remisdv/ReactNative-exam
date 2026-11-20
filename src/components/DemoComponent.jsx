import { Pressable, StyleSheet, Text, View } from "react-native";

import { MODES } from "../api/recettes";

// Partie démo : choix du mode de l'API (composant contrôlé)
export default function DemoComponent({ mode, onChange }) {
  return (
    <>
      <Text style={styles.label}>{"Mode de l'API (démo)"}</Text>
      <View style={styles.rangee}>
        {MODES.map((m) => (
          <Pressable
            key={m}
            onPress={() => onChange(m)}
            style={[styles.bouton, mode === m && styles.boutonActif]}
          >
            <Text style={mode === m ? styles.texteActif : styles.texte}>{m}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, color: "#666", marginBottom: 4 },
  rangee: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  bouton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  boutonActif: { backgroundColor: "#222" },
  texte: { color: "#222" },
  texteActif: { color: "#fff" },
});
