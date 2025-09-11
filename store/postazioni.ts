import type { Postazione } from "./models/Postazione";
import type { Prenotazione } from "./models/Prenotazione";
import type { Categoria } from "./models/Categoria";
import { useAuth } from "./auth";

export const usePostazioni = defineStore("postazioni-store", {
  state: () => ({
    postazioni: [] as Array<Postazione>,
    categorie: [] as Array<Categoria>,
    occupate: [] as any,
    disabilitate: [] as any,
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
        //console.log(response[0]);

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

    getCategoria(postazione: Postazione) {
      const categoria = this.categorie.find(
        (obj) => obj.id_categoria === postazione.id_categoria
      );
      return { ...categoria };
    },

    getPostazione(prenotazione: Prenotazione) {
      const postazione = this.postazioni.find(
        (obj) => obj.id_postazione === prenotazione.id_postazione
      );
      return { ...postazione };
    },

    getPostazioneById(id: Number) {
      const postazione = this.postazioni.find(
        (obj) => obj.id_postazione === id
      );
      //console.log(postazione);
      return { ...postazione };
    },

    async abilita(id_postazione: string) {
      const authStore = useAuth();
      try {
        const response = await $fetch(
          authStore.address + "/abilitaPostazione.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_postazione: id_postazione,
            }),
          } as any
        );

        console.log("Risposta dal server:", response);
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }
      this.postazioni = [];
      await this.getPostazioni();
    },

    async disabilita(id_postazione: string) {
      const authStore = useAuth();
      try {
        const response = await $fetch(
          authStore.address + "/disabilitaPostazione.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_postazione: id_postazione,
            }),
          } as any
        );

        console.log("Risposta dal server:", response);
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }

      this.postazioni = [];
      await this.getPostazioni();
    },

    async getPostazioniDisabilitate() {
      const authStore = useAuth();

      if ((await authStore.controllaSessione()) == false) return;

      try {
        const response = Array<Postazione>(
          await $fetch(authStore.address + "getPostazioniDisabilitate.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({}),
          })
        ) as any;
        //console.log(response[0]);

        this.disabilitate = [...response[0]] as Array<Postazione>;
        console.log(this.disabilitate);
      } catch (e) {
        console.log("errore" + e);
      }

      this.postazioni = [];
      await this.getPostazioni();
    },

    async getDateOccupate(id_postazione: number) {
      let date = [] as any;
      let dateTemp = [] as any;
      const authStore = useAuth();

      if ((await authStore.controllaSessione()) == false) return;

      try {
        const response = Array<Postazione>(
          await $fetch(authStore.address + "getDateOccupate.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              id_postazione: id_postazione * 1,
            }),
          })
        ) as any;
        //console.log(response[0]);

        dateTemp = [...response[0]] as any;
        console.log(dateTemp);
      } catch (e) {
        console.log("errore" + e);
      }

      dateTemp.forEach((data) => {
        date.push(data.data);
      });
      console.log(date);

      return date;
    },
  },
});
