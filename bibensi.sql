-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 30 Juillet 2018 à 21:33
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `bibensi`
--

-- --------------------------------------------------------

--
-- Structure de la table `actualite`
--

CREATE TABLE IF NOT EXISTS `actualite` (
  `idActualite` int(11) NOT NULL AUTO_INCREMENT,
  `Actualite` varchar(255) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`idActualite`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `actualite`
--

INSERT INTO `actualite` (`idActualite`, `Actualite`, `date`) VALUES
(1, 'La bibliothéque sera fermé le lundi prochain!\r\n', '2018-07-03'),
(2, 'L''ENSI sera fermé ce jeudi !\r\n', '2018-07-08'),
(3, 'Evennement RobCUp ce weekend à l''ENSI', '2018-09-18'),
(4, 'CSI organise une formation à la bibliothéque !', '2018-08-16');

-- --------------------------------------------------------

--
-- Structure de la table `adherants`
--

CREATE TABLE IF NOT EXISTS `adherants` (
  `cin` int(8) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `dateInscription` date NOT NULL,
  `nbEmpruntsEnCours` int(11) NOT NULL,
  `nbEmpruntsTotal` int(11) NOT NULL,
  `telephone` int(11) NOT NULL,
  `motDePasse` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`cin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `adherants`
--

INSERT INTO `adherants` (`cin`, `nom`, `prenom`, `adresse`, `dateInscription`, `nbEmpruntsEnCours`, `nbEmpruntsTotal`, `telephone`, `motDePasse`, `image`) VALUES
(10203040, 'MILED', 'Fatma', 'Nabeul Centre 4510', '2018-06-13', 0, 0, 28174258, 'b6edd10559b20cb0a3ddaeb15e5267cc', 'fatma.jpg'),
(11009080, 'MILED', 'Mohamed', '96 rue Mohamed IV résidence les quais', '2018-05-01', 0, 0, 28174258, 'b6edd10559b20cb0a3ddaeb15e5267cc', 'user.png'),
(15457545, 'Makni', 'Elhem', 'rue monji slim ariana 3020', '2018-07-01', 0, 0, 2845125, 'b6edd10559b20cb0a3ddaeb15e5267cc', 'user.png'),
(81452121, 'BADRI', 'Sonda', 'Rue el salema La manouba 2010', '2018-07-23', 0, 0, 28548125, 'b6edd10559b20cb0a3ddaeb15e5267cc', 'user.png');

-- --------------------------------------------------------

--
-- Structure de la table `administrateurs`
--

CREATE TABLE IF NOT EXISTS `administrateurs` (
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telephone` int(11) NOT NULL,
  `adresseEmail` varchar(255) NOT NULL,
  `motDePasse` varchar(150) NOT NULL,
  `nomUtilisateur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `administrateurs`
--

INSERT INTO `administrateurs` (`nom`, `prenom`, `telephone`, `adresseEmail`, `motDePasse`, `nomUtilisateur`) VALUES
('FEHRI', 'Asma', 28174258, 'asma.fehri@ensi-uma.tn', 'b6edd10559b20cb0a3ddaeb15e5267cc', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `emprunts`
--

CREATE TABLE IF NOT EXISTS `emprunts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idLivre` int(11) NOT NULL,
  `cin` int(11) NOT NULL,
  `dateRetourEffective` date NOT NULL,
  `dateRetourTheorique` date NOT NULL,
  `dateEmprunt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cin` (`cin`),
  KEY `fk_idLivre` (`idLivre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Contenu de la table `emprunts`
--

INSERT INTO `emprunts` (`id`, `idLivre`, `cin`, `dateRetourEffective`, `dateRetourTheorique`, `dateEmprunt`) VALUES
(1, 1, 15457545, '2018-07-31', '2018-07-29', '2018-07-10'),
(2, 1, 81452121, '2018-08-31', '2018-09-19', '2018-08-31'),
(3, 1, 11009080, '2018-07-29', '2018-07-10', '2018-05-01'),
(4, 4, 10203040, '2018-07-22', '2018-07-31', '2018-07-22'),
(10, 3, 11009080, '2018-07-22', '2018-07-22', '2018-07-10'),
(12, 3, 10203040, '2018-07-29', '2018-07-29', '2018-07-29'),
(13, 2, 10203040, '2018-07-05', '2018-07-05', '2018-07-29'),
(14, 2, 10203040, '2018-07-05', '2018-07-05', '2018-07-29'),
(15, 3, 81452121, '2018-07-29', '2018-07-29', '2018-07-29'),
(16, 3, 81452121, '2018-07-19', '2018-07-19', '2018-07-29'),
(17, 2, 11009080, '2018-07-06', '2018-07-06', '2018-07-29'),
(18, 3, 11009080, '2018-07-30', '2018-08-22', '2018-07-30'),
(19, 3, 11009080, '2018-07-20', '2018-07-20', '2018-07-30');

-- --------------------------------------------------------

--
-- Structure de la table `livres`
--

CREATE TABLE IF NOT EXISTS `livres` (
  `idLivre` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `auteur` varchar(50) NOT NULL,
  `langue` varchar(50) NOT NULL,
  `nbrExemplaires` int(11) NOT NULL,
  `nbPages` int(11) NOT NULL,
  `nbExemplairesDisponibles` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`idLivre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `livres`
--

INSERT INTO `livres` (`idLivre`, `titre`, `auteur`, `langue`, `nbrExemplaires`, `nbPages`, `nbExemplairesDisponibles`, `description`) VALUES
(1, 'Le bruit et la fureur ', ' William Faulkner', 'français', 14, 405, 12, 'No description for the moment'),
(2, 'The Hunger Games ', ' Suzanne Collins  ', 'Fr', 2, 500, 0, 'No description for the moment'),
(3, 'Harry Potter and the Order of the Phoenix ', ' J.K. Rowling  ', 'Fr', 16, 159, 14, 'No description for the moment'),
(4, 'To Kill a Mockingbird', ' Harper Lee  ', 'EN', 3, 178, 1, 'No description for the moment');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `emprunts`
--
ALTER TABLE `emprunts`
  ADD CONSTRAINT `fk_cin` FOREIGN KEY (`cin`) REFERENCES `adherants` (`cin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idLivre` FOREIGN KEY (`idLivre`) REFERENCES `livres` (`idLivre`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
