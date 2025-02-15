export interface Prenotazione {
  id_prenotazione: number;
  id_utente: number;
  id_postazione: number;
  data: Date;
  n_modifiche: number;
  flag: number;
}
