-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 22, 2025 alle 22:14
-- Versione del server: 5.7.17
-- Versione PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart-planning_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `badge`
--

CREATE TABLE `badge` (
  `id_badge` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `badge`
--

INSERT INTO `badge` (`id_badge`, `id_utente`) VALUES
(1242049446, 10001),
(1247202470, 1004),
(1243794086, 10011),
(978703782, 10002),
(720805542, 10005),
(1241828262, 10010),
(978862758, 1234567890),
(1242299558, 10009),
(973732006, 10003);

-- --------------------------------------------------------

--
-- Struttura della tabella `categorie`
--

CREATE TABLE `categorie` (
  `id_categoria` varchar(5) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `descrizione` varchar(150) NOT NULL,
  `livello` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dump dei dati per la tabella `categorie`
--

INSERT INTO `categorie` (`id_categoria`, `nome`, `descrizione`, `livello`) VALUES
('A1', 'scrivania standard', 'scrivania standard con armadietto e accesso alla rete', 1),
('A2', 'scrivania con monitor', 'scrivania, monitor, armadietto, accesso alla rete', 1),
('B', 'sala riunioni', 'sala riunioni', 1),
('C', 'posto auto', 'posto auto privato', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `postazioni`
--

CREATE TABLE `postazioni` (
  `id_postazione` int(11) NOT NULL,
  `nome` varchar(5) NOT NULL,
  `id_categoria` varchar(5) NOT NULL,
  `descrizione` varchar(100) NOT NULL,
  `stato` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `postazioni`
--

INSERT INTO `postazioni` (`id_postazione`, `nome`, `id_categoria`, `descrizione`, `stato`) VALUES
(0, '1B', 'B', '', 0),
(1, '2B', 'B', '', 0),
(2, '3B', 'B', '', 0),
(3, '4B', 'B', '', 0),
(4, '5B', 'B', '', 0),
(5, '1A1', 'A1', '', 0),
(6, '2A1', 'A1', '', 0),
(7, '3A1', 'A1', '', 0),
(8, '4A1', 'A1', '', 0),
(9, '5A1', 'A1', '', 0),
(10, '6A1', 'A1', '', 0),
(11, '7A1', 'A1', '', 0),
(12, '8A1', 'A1', '', 0),
(13, '9A1', 'A1', '', 0),
(14, '10A1', 'A1', '', 0),
(15, '11A1', 'A1', '', 0),
(16, '12A1', 'A1', '', 0),
(17, '13A1', 'A1', '', 0),
(18, '14A1', 'A1', '', 0),
(19, '15A1', 'A1', '', 0),
(20, '16A1', 'A1', '', 0),
(21, '17A1', 'A1', '', 0),
(22, '18A1', 'A1', '', 0),
(23, '19A1', 'A1', '', 0),
(24, '20A1', 'A1', '', 0),
(25, '1A2', 'A2', '', 0),
(26, '2A2', 'A2', '', 0),
(27, '3A2', 'A2', '', 0),
(28, '4A2', 'A2', '', 0),
(29, '5A2', 'A2', '', 0),
(30, '6A2', 'A2', '', 0),
(31, '7A2', 'A2', '', 0),
(32, '8A2', 'A2', '', 0),
(33, '9A2', 'A2', '', 0),
(34, '10A2', 'A2', '', 0),
(35, '11A2', 'A2', '', 0),
(36, '12A2', 'A2', '', 0),
(37, '13A2', 'A2', '', 0),
(38, '14A2', 'A2', '', 0),
(39, '15A2', 'A2', '', 0),
(40, '16A2', 'A2', '', 0),
(41, '17A2', 'A2', '', 0),
(42, '18A2', 'A2', '', 0),
(43, '19A2', 'A2', '', 0),
(44, '20A2', 'A2', '', 0),
(45, '21A2', 'A2', '', 0),
(46, '22A2', 'A2', '', 0),
(47, '23A2', 'A2', '', 0),
(48, '24A2', 'A2', '', 0),
(49, '25A2', 'A2', '', 0),
(50, '26A2', 'A2', '', 0),
(51, '27A2', 'A2', '', 0),
(52, '28A2', 'A2', '', 0),
(53, '29A2', 'A2', '', 0),
(54, '30A2', 'A2', '', 0),
(56, '1C', 'C', 'parcheggio riservato', 0),
(57, '2C', 'C', 'parcheggio riservato', 0),
(58, '3C', 'C', 'parcheggio riservato', 0),
(59, '4C', 'C', 'parcheggio riservato', 0),
(60, '5C', 'C', 'parcheggio riservato', 0),
(61, '6C', 'C', 'parcheggio riservato', 0),
(62, '7C', 'C', 'parcheggio riservato', 0),
(63, '8C', 'C', 'parcheggio riservato', 0),
(64, '9C', 'C', 'parcheggio riservato', 0),
(65, '10C', 'C', 'parcheggio riservato', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `id_prenotazione` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `id_postazione` int(11) NOT NULL,
  `data` date NOT NULL,
  `n_modifiche` int(11) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prenotazioni`
--

INSERT INTO `prenotazioni` (`id_prenotazione`, `id_utente`, `id_postazione`, `data`, `n_modifiche`, `flag`) VALUES
(1, 10001, 24, '2025-09-22', 0, 0),
(3, 10001, 32, '2025-09-22', 0, 0),
(5, 10001, 61, '2025-09-22', 0, 0),
(6, 1234567890, 23, '2025-09-22', 0, 0),
(7, 1234567890, 27, '2025-09-22', 0, 0),
(8, 1234567890, 37, '2025-09-22', 0, 0),
(9, 1234567890, 29, '2025-09-22', 0, 0),
(10, 1234567890, 34, '2025-09-22', 0, 0),
(11, 1234567890, 16, '2025-09-22', 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id_utente` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `cognome` varchar(20) NOT NULL,
  `genere` varchar(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `livello` int(11) NOT NULL,
  `id_coordinatore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id_utente`, `nome`, `cognome`, `genere`, `username`, `password`, `livello`, `id_coordinatore`) VALUES
(1004, 'Anastasia', 'Faggianelli', 'F', 'Anastasia Faggianelli', 'AnastasiaFaggianelli01#', 2, 10000),
(10000, 'admin', 'admin', 'M', 'admin', 'admin', 3, 10000),
(10001, 'Sara', 'Cerri', 'F', 'Sara Cerri', 'SaraCerri01#', 2, 10001),
(10002, 'Elena', 'Ruggeri', 'F', 'Elena Ruggeri', 'ElenaRuggeri01#', 2, 10000),
(10003, 'Rebecca', 'D\'Aranno', 'F', 'Rebecca D\'Aranno', 'RebeccaD\'Aranno01#', 2, 10000),
(10005, 'Ilaria', 'Caldarone', 'F', 'Ilaria Caldarone', 'IlariaCaldarone01#', 2, 10000),
(10009, 'Nevea', 'La Rana', 'F', 'Nevea La Rana', 'NeveaLaRana01#', 1, 10003),
(10010, 'Jelena', 'Kapor', 'F', 'Jelena Kapor', 'JelenaKapor01#', 1, 10002),
(10011, 'Domenico', 'De Chiara', 'F', 'Domenico De Chiara', 'DomenicoDeChiara01#', 1, 10005),
(1234567890, 'Mario', 'Rossi', 'M', 'Rossi Mario', 'prova', 1, 10001);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indici per le tabelle `postazioni`
--
ALTER TABLE `postazioni`
  ADD PRIMARY KEY (`id_postazione`),
  ADD KEY `categoria` (`id_categoria`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id_prenotazione`),
  ADD KEY `id_utente` (`id_utente`,`id_postazione`),
  ADD KEY `id_postazione` (`id_postazione`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utente`),
  ADD KEY `id_coordinatore` (`id_coordinatore`),
  ADD KEY `id_coordinatore_2` (`id_coordinatore`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `postazioni`
--
ALTER TABLE `postazioni`
  MODIFY `id_postazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `id_prenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `postazioni`
--
ALTER TABLE `postazioni`
  ADD CONSTRAINT `postazioni_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorie` (`id_categoria`);

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `prenotazioni_ibfk_1` FOREIGN KEY (`id_postazione`) REFERENCES `postazioni` (`id_postazione`),
  ADD CONSTRAINT `prenotazioni_ibfk_2` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`);

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utenti_ibfk_1` FOREIGN KEY (`id_coordinatore`) REFERENCES `utenti` (`id_utente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
