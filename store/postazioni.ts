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
      const formattedDate = data.toISOString().split("T")[0];
      console.log(formattedDate); // Format to 'YYYY-MM-DD'
      const authStore = useAuth();

      try {
        const response = (await $fetch(
          authStore.address + "checkPostazioniOccupate.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: formattedDate,
            }),
          }
        )) as any;

        console.log("Response:", response);

        if (response.stato === "occupate") {
          // Here, we expect response.occupate to be an array of occupied postazioni
          this.occupate = response.occupate;
          console.log("Postazioni occupate:", this.occupate);
        } else {
          // If no postazioni are occupied
          this.occupate = [];
          console.log("No postazioni occupied on this date.");
        }
      } catch (e) {
        console.error("Errore nella richiesta:", e);
      }
    },
  },
});
