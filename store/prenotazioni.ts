import type { Prenotazione } from "./models/Prenotazione";
import { useAuth } from "./auth";
import type { Postazione } from "./models/Postazione";

export const usePrenotazioni = defineStore("prenotazioni-store", {
  state: () => ({
    prenotazioni: [] as Array<Prenotazione>,
  }),
  actions: {
    init() {},

    async getPrenotazioni() {
      const authStore = useAuth();

      if ((await authStore.controllaSessione()) == false) return;

      try {
        const response = Array<Prenotazione>(
          await $fetch(authStore.address + "getPrenotazioni.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
              id_utente: authStore.utente.id_utente,
            }),
          })
        ) as any;
        console.log(response[0]);

        this.prenotazioni = [...response[0]] as Array<Prenotazione>;
        this.ordinaData();
        //console.log(this.prenotazioni);
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async nuovaPrenotazione(data: Date, id_postazione: number) {
      const authStore = useAuth();
      const router = useRouter();

      try {
        const response = (await $fetch(
          authStore.address + "insertPrenotazioni.php",
          {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
              id_utente: authStore.utente.id_utente,
              id_postazione: id_postazione,
              data: data,
            }),
          }
        )) as any;

        //console.log(response[0]);
        this.getPrenotazioni();
        this.ordinaData();
        console.log(this.prenotazioni);
        router.push({ name: "home" });
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async modificaPrenotazione(prenotazione: Prenotazione) {
      const authStore = useAuth();
      const router = useRouter();

      console.log("STO MODIFICANDO---------------------------------------");

      try {
        console.log("Dati inviati:", prenotazione);

        const response = await $fetch(
          authStore.address + "/updatePrenotazione.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_prenotazione: prenotazione.id_prenotazione,
              data: prenotazione.data,
              id_postazione: prenotazione.id_postazione,
              n_modifiche: prenotazione.n_modifiche,
            }),
          } as any
        );

        console.log("Risposta dal server:", response);
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }

      this.getPrenotazioni();
      this.ordinaData();
      console.log(this.prenotazioni);
      router.push({ name: "home" });
    },

    async eliminaPrenotazione(id: number) {
      console.log("elimino");
      const authStore = useAuth();

      try {
        const response = (await $fetch(
          authStore.address + "eliminaPrenotazione.php",
          {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
              id_prenotazione: id,
            }),
          }
        )) as any;

        //this.ordinaData();
        const index = this.prenotazioni.findIndex(
          (item) => item.id_prenotazione == id
        );
        console.log("indice", index);
        this.prenotazioni.splice(index, 1);
      } catch (e) {
        console.log("errore" + e);
      }

      this.getPrenotazioni();
    },

    filtraData(data: string) {
      console.log(data);
      let filtrato = this.prenotazioni.filter((obj) => obj.data + "" == data);
      return filtrato;
    },

    ordinaData() {
      this.prenotazioni = this.prenotazioni
        .slice()
        .sort(
          (a, b) =>
            new Date(b.data + "").getTime() - new Date(a.data + "").getTime()
        );
    },

    getPrenotazioneById(id: number) {
      const prenotazione = this.prenotazioni.find(
        (obj) => obj.id_prenotazione == id
      );
      console.log(prenotazione);
      return { ...prenotazione };
    },
  },
});
