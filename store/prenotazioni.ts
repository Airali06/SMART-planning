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

        console.log(this.prenotazioni);
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async nuovaPrenotazione(data: number, id_postazione: number) {
      const authStore = useAuth();

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

        console.log(response[0]);
        this.getPrenotazioni();

        console.log(this.prenotazioni);
      } catch (e) {
        console.log("errore" + e);
      }
    },
  },
});
