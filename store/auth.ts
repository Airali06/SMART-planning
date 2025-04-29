import type { Utente } from "./models/Utente";
export const useAuth = defineStore("auth-store", {
  state: () => ({
    utente: {
      id_utente: 0,
      nome: "",
      username: "",
      cognome: "",
      livello: 0,
      id_coordinatore: 0,
    } as Utente,
    sessione: {
      id_sessione: 0, // id sessione = 0 -> sessione non attiva
      scadenza: 0,
      controlCode: 0,
      /*controlCode:
        serve per evitare attacchi di bruteforce al server. 
        invio di API con numero di sessione casuale che 
        potrebbero chiudere le sessioni e bloccarle. 
        Il logout avviene solo se l'id_sessione è accompagnato 
        dal giusto controlCode. Viene generato dal server in modo 
        casuale al momento del login.
      */
    },
    address: "http://127.0.0.1/Z-planning/api/",
  }),
  actions: {
    init() {
      if (typeof window !== "undefined") {
        // Puoi usare localStorage solo qui

        const sessione = localStorage.getItem("sessione");
        if (sessione) {
          const parsedSessione = JSON.parse(sessione);
          this.sessione = parsedSessione;

          const utente = localStorage.getItem("utente") as any;
          if (utente) {
            const parsedUtente = JSON.parse(utente);
            this.utente = parsedUtente;
          }
        }
      } else {
        console.log("localStorage non è disponibile nel server");
      }
    },

    async login(id: number, password: string) {
      //if (this.utente.id_utente != 0) return;

      try {
        //console.log("try");
        //la response ricevuta come tipo string per facilitare la conversione in oggetto
        const response: string = await $fetch(this.address + "login.php", {
          //composizione dell messaggio di request
          method: "POST",
          headers: {
            "Content-Type": "application/json", //specifica tipologia di dato inviata
          },
          body: JSON.stringify({
            //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
            id_utente: id,
            password: password,
            id_sessione: id,
          }),
        });

        //const testo = (await response.text()) as string;
        const dati = JSON.parse(response); //la risposta viene trasformata da stringa (contenete dati con struttura JSON) in oggetto ts
        console.log(dati);

        if (dati.errore != "") {
          //se la response ha il campo errore impostatoviene restituito il codice di errore e termina
          return dati.errore;
        }

        //riempimento utente dello store con dati ricevuti
        this.utente = {
          id_utente: dati.id_utente,
          nome: dati.nome,
          cognome: dati.cognome,
          genere: dati.genere,
          username: dati.username,
          livello: dati.livello * 1,
          id_coordinatore: dati.id_coordinatore,
        };

        //setting dati di sessione
        this.sessione.scadenza = dati.scadenza * 1;
        this.sessione.id_sessione = dati.id_sessione;
        this.sessione.controlCode = dati.controlCode;
        this.setLocalStorage();

        console.log(this.utente);
      } catch (e) {
        console.log("errore" + e);
      }

      console.log(this.sessione.id_sessione);
      console.log(this.sessione.controlCode);

      const router = useRouter();
      //router.push({ name: "home" });
    },

    async controllaSessione() {
      /*manda una richiesta per controllare 
      se la sessione è ancora attiva. 
      Se è scaduta, azzera lo store Auth e torna al login */

      try {
        const response: string = (await $fetch(
          this.address + "sessionCheck.php",
          {
            //composizione dell messaggio di request
            method: "POST",
            headers: {
              "Content-Type": "application/json", //specifica tipologia di dato inviata
            },
            body: JSON.stringify({
              //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
              id_sessione: this.sessione.id_sessione,
              controlCode: this.sessione.controlCode,
            }),
          }
        )) as string;
        console.log(response);

        //tentativo di convertire forzatamente in oggetto un JSON
        const jsonString = JSON.stringify(response);
        const dati = JSON.parse(jsonString.toString() as string) as any; //la risposta viene trasformata da stringa (contenete dati con struttura JSON) in oggetto ts
        console.log(dati);

        if (dati.alive == "errore") {
          //svuotamento store
          console.log(this.sessione.controlCode);
          this.utente = {} as Utente;
          this.sessione.id_sessione = 0;
          this.sessione.scadenza = 0;
          this.sessione.controlCode = 0;
          this.clearLocalStorage();

          const router = useRouter();
          //router.push({ name: "index" });
          return false;
        }

        if (dati.alive == "OK") {
          console.log("session alive");
          this.setLocalStorage();
          return true;
        }
      } catch (e) {
        console.log("errore" + e);
      }
    },

    async logout() {
      if (this.sessione.id_sessione == 0) return;

      try {
        const response: string = (await $fetch(this.address + "logout.php", {
          //composizione dell messaggio di request
          method: "POST",
          headers: {
            "Content-Type": "application/json", //specifica tipologia di dato inviata
          },
          body: JSON.stringify({
            //trasforma un oggetto in JSON (json obbligatorio per mandare dati al server)
            id_sessione: this.sessione.id_sessione,
            controlCode: this.sessione.controlCode,
          }),
        })) as string;
        console.log(response);

        //tentativo di convertire forzatamente in oggetto un JSON
        const jsonString = JSON.stringify(response);
        const dati = JSON.parse(jsonString.toString() as string) as any; //la risposta viene trasformata da stringa (contenete dati con struttura JSON) in oggetto ts
        console.log(dati);

        if (dati.logout == "OK") {
          //svuotamento store
          console.log(this.sessione.controlCode);

          (this.utente = {
            id_utente: 0,
            nome: "",
            username: "",
            cognome: "",
            genere: "",
            livello: 0,
            id_coordinatore: 0,
          } as Utente),
            (this.sessione.id_sessione = 0);
          this.sessione.scadenza = 0;
          this.sessione.controlCode = 0;
          this.clearLocalStorage();
          const router = useRouter();
          router.push({ name: "index" });
        }
      } catch (e) {
        console.log("errore" + e);
      }

      return true;
    },

    setLocalStorage() {
      if (typeof window !== "undefined") {
        // Puoi usare localStorage solo qui altrimenti da problemi
        localStorage.setItem("utente", JSON.stringify(this.utente));
        console.log(localStorage.getItem("utente"));
        localStorage.setItem("sessione", JSON.stringify(this.sessione));
        console.log(localStorage.getItem("utente"));
      } else {
        console.log("localStorage non è disponibile nel server");
      }
    },

    clearLocalStorage() {
      //localStorage.removeItem("utente");
      if (typeof window !== "undefined") {
        localStorage.removeItem("utente");
        console.log(localStorage.getItem("utente"));
        localStorage.removeItem("sessione");
        console.log(localStorage.getItem("utente"));
      } else {
        console.log("localStorage non è disponibile nel server");
      }
    },

    testaPassword(password: string) {
      if (password.length < 8) {
        return false;
      }

      // Controllo lettera maiuscola
      if (!/[A-Z]/.test(password)) {
        return false;
      }

      // Controllo lettera minuscola
      if (!/[a-z]/.test(password)) {
        return false;
      }

      // Controllo numero
      if (!/[0-9]/.test(password)) {
        return false;
      }

      // Controllo carattere speciale
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
      }

      return true;
    },
  },
});
