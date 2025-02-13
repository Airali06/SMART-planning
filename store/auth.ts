import type { Utente } from "./models/Utente";
export const useAuth = defineStore("auth-store", {
  state: () => ({
    utente: {} as Utente,
    sessione: {
      id_sessione: 0, // id sessione = 0 -> sessione non attiva
      scadenza: 0,
    },
    address: "http://127.0.0.1/Z-planning/api/",
  }),
  actions: {
    init() {},

    async login(id: number, password: string) {
      //if (this.utente.id_utente != 0) return;

      try {
        console.log("ciao");
        const response: string = await $fetch(this.address + "login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_utente: id,
            password: password,
            id_sessione: id,
          }),
        });

        //const testo = (await response.text()) as string;
        const dati = JSON.parse(response);
        console.log(dati);

        if (dati.errore != "") {
          return dati.errore;
        }

        this.utente = {
          id_utente: dati.id_utente,
          nome: dati.nome,
          cognome: dati.cognome,
          username: dati.username,
          livello: dati.livello * 1,
          id_coordinatore: dati.id_coordinatore,
        };

        this.sessione.scadenza = dati.scadenza * 1;
        this.sessione.id_sessione = dati.id_sessione;

        console.log(this.utente);
      } catch (e) {
        console.log("errore" + e);
      }

      console.log(this.sessione.id_sessione);

      // Visualizza la risposta
    },

    async controllaSessione() {},

    async logout() {
      return true;
    },
  },
});
