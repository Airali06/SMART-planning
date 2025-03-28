import type { Prenotazione } from "./models/Prenotazione";
import { useAuth } from "./auth";
import type { Utente } from "./models/Utente";

export const useDipendenti = defineStore("dipendenti-store", {
  state: () => ({
    dipendenti: [] as Array<Utente>,
  }),
  actions: {
    async getDipendentiCoordinatore(id: number) {
      const authStore = useAuth();
      try {
        const response = Array<Utente>(
          await $fetch(authStore.address + "getDipendentiCoordinatore.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              id_coordinatore: id,
            }),
          })
        ) as any;
        //console.log(response[0]);

        this.dipendenti = [...response[0]] as Array<Utente>;
        console.log(this.dipendenti);
      } catch (e) {
        console.log("errore" + e);
      }
    },
    cercaDipendenti(key: string) {
      key = key.toLowerCase();

      let filtrato = [] as Array<Utente>;
      for (let i in this.dipendenti) {
        const regex = new RegExp(key, "i");
        if (
          regex.test(this.dipendenti[i].username.toLowerCase()) ||
          regex.test(this.dipendenti[i].id_utente + "".toLowerCase())
        ) {
          filtrato.push(this.dipendenti[i]);
        }
      }

      return filtrato;
    },
  },
});
