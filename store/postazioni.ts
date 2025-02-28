import type { Postazione } from "./models/Postazione";
import type { Categoria } from "./models/Categoria";
import { useAuth } from "./auth";

export const usePostazioni = defineStore("postazioni-store", {
  state: () => ({
    postazioni: [] as Array<Postazione>,
    categorie: [] as Array<Categoria>,
    occupate: [] as any,
  }),
  actions: {
    init() {},

    async getPostazioni() {
      if (this.postazioni.length > 0) {
        console.log("già caricato");
        return;
      }

      const authStore = useAuth();

      if ((await authStore.controllaSessione()) == false) return;

      try {
        const response = Array<Postazione>(
          await $fetch(authStore.address + "getPostazioni.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({}),
          })
        ) as any;
        console.log(response[0]);

        this.postazioni = [...response[0]] as Array<Postazione>;
        console.log(this.postazioni);
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async getCategorie() {
      if (this.categorie.length > 0) {
        console.log("già caricato");
        return;
      }

      const authStore = useAuth();

      if ((await authStore.controllaSessione()) == false) return;

      try {
        const response = Array<Categoria>(
          await $fetch(authStore.address + "getCategorie.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({}),
          })
        ) as any;
        console.log(response[0]);

        this.categorie = [...response[0]] as Array<Categoria>;
        console.log(this.categorie);
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async checkPostazioniOccupate(data: Date) {
      const authStore = useAuth();
      try {
        const response = (await $fetch(
          authStore.address + "checkPostazioniOccupate.php",
          {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              data: data,
            }),
          }
        )) as any;
        console.log("occupate");
        console.log(response);

        this.occupate = [...response];
      } catch (e) {
        console.log("errore" + e);
      }
    },
  },
});
