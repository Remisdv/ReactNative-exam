import { useEffect } from "react";
import { create } from "zustand";

import { chargerRecettes } from "../api/recettes";

// statut : inactif / chargement / succes / erreur
export const useRecetteStore = create((set, get) => ({
    recettes: [],
    statut: "inactif",
    erreur: null,

    charger: async () => {
        // Évite de lancer deux requêtes en même temps
        if (get().statut === "chargement") return;
        set({ statut: "chargement", erreur: null });
        try {
            const donnees = await chargerRecettes();
            set({ recettes: donnees, statut: "succes" });
        } catch (e) {
            set({ statut: "erreur", erreur: e.message });
        }
    },
}));

export function useRecettes() {
    const recettes = useRecetteStore((state) => state.recettes);
    const statut = useRecetteStore((state) => state.statut);
    const erreur = useRecetteStore((state) => state.erreur);
    const charger = useRecetteStore((state) => state.charger);

    useEffect(() => {
        if (statut === "inactif") {
            charger();
        }
    }, [statut, charger]);

    return { recettes, statut, erreur, charger };
}
