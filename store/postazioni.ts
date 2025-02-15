import type { Postazione } from "./models/Postazione";
import type { Categoria } from "./models/Categoria";
import { useAuth } from "./auth";

export const usePostazioni = defineStore("postazioni-store", {
  state: () => ({
    postazioni: [] as Array<Postazione>,
    categorie: [] as Array<Categoria>,
  }),
  actions: {
    init() {},
  },
});
