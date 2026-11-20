import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { existeDeja, useCourseStore } from "../store/CourseStore";

export default function CourseForm() {
    const articles = useCourseStore((state) => state.articles);
    const ajouterArticle = useCourseStore((state) => state.ajouterArticle);

    const [texte, setTexte] = useState("");
    const [erreur, setErreur] = useState(null);

    function ajouter() {
        const nom = texte.trim();

        if (nom === "") {
            setErreur("L'article ne peut pas être vide.");
            return;
        }
        if (existeDeja(articles, nom)) {
            setErreur(`« ${nom} » est déjà dans la liste.`);
            return;
        }

        ajouterArticle(nom);
        setTexte("");
        setErreur(null);
    }

    function modifier(nouveauTexte) {
        setTexte(nouveauTexte);
        setErreur(null);
    }

    return (
        <View style={styles.conteneur}>
            <View style={styles.rangee}>
                <TextInput
                    style={[styles.champ, erreur && styles.champErreur]}
                    value={texte}
                    onChangeText={modifier}
                    placeholder="Ajouter un article"
                    returnKeyType="done"
                    onSubmitEditing={ajouter}
                    submitBehavior="submit" // le clavier reste ouvert pour enchaîner les ajouts
                />
                <Pressable style={styles.bouton} onPress={ajouter}>
                    <Text style={styles.boutonTexte}>Ajouter</Text>
                </Pressable>
            </View>
            {erreur ? <Text style={styles.erreur}>{erreur}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    conteneur: { marginBottom: 12, gap: 6 },
    rangee: { flexDirection: "row", gap: 8 },
    champ: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    champErreur: { borderColor: "#c00" },
    bouton: {
        backgroundColor: "#222",
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
    },
    boutonTexte: { color: "#fff", fontWeight: "bold" },
    erreur: { color: "#c00" },
});
