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

        /*
        for (const prenotazione of response) {
          // Verifica che ogni elemento abbia la forma giusta (facoltativo)
          let temp = {
            id_prenotazione: prenotazione.id_prenotazione * 1,
            id_utente: prenotazione.id_utente * 1,
            id_postazione: prenotazione.id_postazione * 1,
            n_modifiche: prenotazione.n_modifiche * 1,
            data: new Date(prenotazione.data),
            flag: prenotazione.flag,
          } as Prenotazione;
          this.prenotazioni.push({ ...temp });
          console.log(prenotazione);
          this.prenotazioni.push(prenotazione as Prenotazione);
        }*/

        console.log(this.prenotazioni);
      } catch (e) {
        console.log("errore" + e);
      }
    },
  },
});
