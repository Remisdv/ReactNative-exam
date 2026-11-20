import { create } from "zustand";

export const useFavorisStore = create((set) => ({
    idsFavoris: [],

    // Ajoute l'id s'il n'y est pas le retire s'il y est déjà
    basculerFavori: (id) =>
        set((state) => ({
            idsFavoris: state.idsFavoris.includes(id)
                ? state.idsFavoris.filter((x) => x !== id)
                : [...state.idsFavoris, id],
        })),
}));
