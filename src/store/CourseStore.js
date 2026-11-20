import { create } from "zustand";

export function existeDeja(articles, nom) {
    return articles.some((article) => article.toLowerCase() === nom.toLowerCase());
}

export const useCourseStore = create((set, get) => ({
    articles: [],

    ajouterArticle: (nom) => set((state) => ({ articles: [...state.articles, nom] })),

    ajouterIngredients: (ingredients) => {
        const nouveaux = ingredients.filter((i) => !existeDeja(get().articles, i));
        set((state) => ({ articles: [...state.articles, ...nouveaux] }));
        return nouveaux.length;
    },

    supprimerArticle: (nom) =>
        set((state) => ({ articles: state.articles.filter((article) => article !== nom) })),
}));
