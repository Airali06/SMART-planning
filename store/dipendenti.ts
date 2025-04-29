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

    async getPrenotazioniDipendente(id: string) {
      const authStore = useAuth();
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
              id_utente: id,
            }),
          })
        ) as any;
        return response[0];
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async insertUtente(utente: Utente, password: string) {
      const authStore = useAuth();
      try {
        const response = Array<Prenotazione>(
          await $fetch(authStore.address + "insertUtente.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              nome: utente.nome,
              cognome: utente.cognome,
              genere: utente.genere,
              username: utente.username,
              livello: utente.livello,
              password: password,
              id_coordinatore: utente.id_coordinatore,
            }),
          })
        ) as any;
        return response[0];
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async updateUtente(utente: Utente, password: string) {
      const authStore = useAuth();
      try {
        const response = Array<Prenotazione>(
          await $fetch(authStore.address + "updateUtente.php", {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              nome: utente.nome,
              cognome: utente.cognome,
              genere: utente.genere,
              username: utente.username,
              livello: utente.livello,
              password: password,
              id_coordinatore: utente.id_coordinatore,
            }),
          })
        ) as any;
      } catch (e) {
        console.log("errore" + e);
      }
    },

    getDipendenteById(id: number) {
      const dipendente = this.dipendenti.find((obj) => obj.id_utente == id);
      console.log(dipendente);
      return { ...dipendente };
    },

    getCoordinatori() {
      let coordinatori = [] as Array<Utente>;

      this.dipendenti.forEach((utente) => {
        if (utente.livello == 2) {
          coordinatori.push(utente);
        }
      });
      return coordinatori;
    },
  },
});
