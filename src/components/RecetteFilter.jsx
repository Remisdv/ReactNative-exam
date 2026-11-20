import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { rechercherParCategorie } from "../api/recettes";
import { CATEGORIES } from "../data/recettes";

// Tous les boutons (Toutes compris) utilisent rechercherParCategorie.
// onChange reçoit { categorie, resultats } : resultats = null pendant la recherche.
export default function RecetteFilter({ onChange }) {
    // null = aucun bouton touché : la page affiche la liste du store (chargerRecettes)
    const [categorie, setCategorie] = useState(null);
    const categorieAffichee = categorie ?? "Toutes";

    useEffect(() => {
        if (categorie === null) return;

        let perimee = false;

        rechercherParCategorie(categorie).then((resultats) => {
            if (perimee) return;
            onChange({ categorie, resultats });
        });

        return () => {
            perimee = true;
        };
    }, [categorie, onChange]);

    function choisir(nouvelleCategorie) {
        if (nouvelleCategorie === categorieAffichee) return;
        setCategorie(nouvelleCategorie);
        onChange({ categorie: nouvelleCategorie, resultats: null });
    }

    return (
        <View style={styles.rangee}>
            {["Toutes", ...CATEGORIES].map((c) => (
                <Pressable
                    key={c}
                    onPress={() => choisir(c)}
                    style={[styles.bouton, categorieAffichee === c && styles.boutonActif]}
                >
                    <Text style={categorieAffichee === c ? styles.texteActif : styles.texte}>{c}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
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
