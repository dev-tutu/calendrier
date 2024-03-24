-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 24 mars 2024 à 18:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `spa`
--

-- --------------------------------------------------------

--
-- Structure de la table `calendrier`
--

CREATE TABLE `calendrier` (
  `id` int(11) NOT NULL,
  `nid` varchar(100) NOT NULL,
  `txt` text NOT NULL,
  `jour` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `calendrier`
--

INSERT INTO `calendrier` (`id`, `nid`, `txt`, `jour`) VALUES
(835, '815', 's', '10-03-2024'),
(836, '815', 's', '11-03-2024'),
(837, '815', 's', '12-03-2024'),
(838, '815', 's', '13-03-2024'),
(839, '815', 's', '14-03-2024'),
(840, '815', 's', '15-03-2024'),
(841, '815', 's', '16-03-2024');

-- --------------------------------------------------------

--
-- Structure de la table `demande_absence`
--

CREATE TABLE `demande_absence` (
  `id` int(11) NOT NULL,
  `nid` int(11) NOT NULL,
  `debut` date NOT NULL,
  `fin` date NOT NULL,
  `visa` tinyint(1) NOT NULL,
  `motif` text NOT NULL,
  `jour` float NOT NULL,
  `day_deduction` int(11) DEFAULT NULL,
  `descript` text NOT NULL,
  `depot` date NOT NULL,
  `valideur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demande_absence`
--

INSERT INTO `demande_absence` (`id`, `nid`, `debut`, `fin`, `visa`, `motif`, `jour`, `day_deduction`, `descript`, `depot`, `valideur`) VALUES
(264, 815, '2024-03-10', '2024-03-16', 0, 'service', 7, 5, '', '2024-03-24', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE `fonction` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `ordre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`id`, `nom`, `ordre`) VALUES
(1, 'pax', 0),
(2, 'cdb', 1),
(3, 'cds', 2),
(4, 'sec', 3),
(5, 'chef', 4),
(6, 'rh', 5);

-- --------------------------------------------------------

--
-- Structure de la table `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `grade` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `grade`
--

INSERT INTO `grade` (`id`, `grade`, `ordre`) VALUES
(1, 'DGN', 0),
(2, '1CL', 1),
(3, 'BRI', 2),
(4, 'CPL', 3),
(5, 'BCH', 4),
(6, 'CCH', 5),
(7, 'BCH1', 6),
(8, 'CCH1', 7),
(9, 'SGT', 8),
(10, 'MDL', 9),
(11, 'SCH', 10),
(12, 'MCH', 11),
(13, 'ADJ', 12),
(14, 'ADC', 13),
(15, 'MAJ', 14),
(16, 'ASP', 15),
(17, 'SLT', 16),
(18, 'LTN', 17),
(19, 'CNE', 18),
(20, 'CES', 19),
(21, 'CDT', 20),
(22, 'LCL', 21),
(23, 'COL', 22);

-- --------------------------------------------------------

--
-- Structure de la table `militaire`
--

CREATE TABLE `militaire` (
  `id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `nom` text NOT NULL,
  `ue` int(11) NOT NULL,
  `peloton` int(11) NOT NULL,
  `nid` int(11) NOT NULL,
  `nb_permission` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `militaire`
--

INSERT INTO `militaire` (`id`, `grade`, `nom`, `ue`, `peloton`, `nid`, `nb_permission`) VALUES
(97, 10, 'Nom123', 8, 1, 635, 0),
(98, 3, 'Nom456', 8, 1, 566, 45),
(99, 15, 'Nom789', 8, 1, 922, 37),
(100, 7, 'Nom012', 8, 1, 916, 45),
(101, 18, 'Nom345', 8, 1, 815, 30);

-- --------------------------------------------------------

--
-- Structure de la table `motifs`
--

CREATE TABLE `motifs` (
  `id` int(11) NOT NULL,
  `lib_long` text NOT NULL,
  `lib_court` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `motifs`
--

INSERT INTO `motifs` (`id`, `lib_long`, `lib_court`) VALUES
(1, 'service', 's'),
(2, 'permission', 'p'),
(3, 'mission', 'mi'),
(4, 'formation', 'f'),
(5, 'arret', 'a'),
(6, 'malade', 'm'),
(7, 'absence', 'abs'),
(8, 'deserteur', 'des'),
(9, 'opex', 'o'),
(10, 'reconversion', 'r'),
(11, 'conge', 'c'),
(12, 'autre', 'au');

-- --------------------------------------------------------

--
-- Structure de la table `peloton`
--

CREATE TABLE `peloton` (
  `id` int(11) NOT NULL,
  `peloton` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `peloton`
--

INSERT INTO `peloton` (`id`, `peloton`) VALUES
(5, 'autre'),
(1, 'p1'),
(2, 'p2'),
(3, 'p3'),
(4, 'p4');

-- --------------------------------------------------------

--
-- Structure de la table `rtt`
--

CREATE TABLE `rtt` (
  `id` int(11) NOT NULL,
  `date_RTT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rtt`
--

INSERT INTO `rtt` (`id`, `date_RTT`) VALUES
(1, '2023-12-07');

-- --------------------------------------------------------

--
-- Structure de la table `spa`
--

CREATE TABLE `spa` (
  `id` int(11) NOT NULL,
  `nid` int(11) NOT NULL,
  `grade` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `ue` varchar(50) NOT NULL,
  `peloton` varchar(50) NOT NULL,
  `statut` varchar(50) NOT NULL,
  `jour` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `spa`
--

INSERT INTO `spa` (`id`, `nid`, `grade`, `nom`, `ue`, `peloton`, `statut`, `jour`) VALUES
(122, 73, 'BCH1', 'hfjk', 'ecl', 'p1', 'mission', '30-03-2023'),
(123, 10, '1CL', 'hello', 'ecl', 'p1', 'opex', '30-03-2023'),
(124, 30, 'ADC', 'autre', 'ecl', 'p1', 'permission', '15-04-2023'),
(125, 10, '1CL', 'hello', 'ecl', 'p1', 'opex', '15-04-2023'),
(126, 30, 'ADC', 'autre', 'ecl', 'p1', 'service', '17-04-2023'),
(127, 10, '1CL', 'hello', 'ecl', 'p1', 'arret', '17-04-2023'),
(129, 10, '1CL', 'hello', 'ecl', 'p1', 'service', '17-04-2023'),
(130, 30, 'ADC', 'autre', 'ecl', 'p1', 'naissance', '26-11-2023'),
(131, 10, '1CL', 'hello', 'ecl', 'p1', 'present', '26-11-2023'),
(132, 30, 'ADC', 'autre', 'ecl', 'p1', 'reconversion', '26-11-2023'),
(134, 30, 'ADC', 'autre', 'ecl', 'p1', 'arret', '26-11-2023'),
(136, 30, 'ADC', 'autre', 'ecl', 'p1', 'permission', '26-11-2023'),
(139, 10, '1CL', 'hello', 'ecl', 'p1', 'permission', '26-11-2023'),
(165, 30, 'ADC', 'autre', 'ecl', 'p1', 'mission', '26-11-2023'),
(195, 10, '1CL', 'hello', 'ecl', 'p1', 'mission', '26-11-2023'),
(197, 30, 'ADC', 'autre', 'ecl', 'p1', 'formation', '26-11-2023'),
(201, 10, '1CL', 'hello', 'ecl', 'p1', 'formation', '26-11-2023'),
(204, 10, '1CL', 'hello', 'ecl', 'p1', 'service', '26-11-2023'),
(206, 501, 'ASP', 'Nom123', 'ecl', 'p1', 'arret', '05-12-2023'),
(207, 230, 'ADC', 'Nom890', 'ecl', 'p1', 'abs', '05-12-2023'),
(208, 413, 'CDT', 'Nom789', 'ecl', 'p1', 'present', '05-12-2023'),
(209, 774, 'COL', 'Nom234', 'ecl', 'p1', 'present', '05-12-2023'),
(210, 838, 'COL', 'Nom345', 'ecl', 'p1', 'present', '05-12-2023'),
(211, 623, 'LCL', 'Nom890', 'ecl', 'p1', 'present', '05-12-2023'),
(212, 83, 'CES', 'Nom789', 'ecl', 'p1', 'present', '05-12-2023'),
(213, 59, 'CES', 'Nom890', 'ecl', 'p1', 'present', '05-12-2023'),
(214, 406, 'CNE', 'Nom456', 'ecl', 'p1', 'present', '05-12-2023'),
(215, 123, 'CNE', 'Nom567', 'ecl', 'p1', 'present', '05-12-2023'),
(216, 815, 'LTN', 'Nom345', 'ecl', 'p1', 'present', '05-12-2023'),
(217, 857, 'LTN', 'Nom234', 'ecl', 'p1', 'present', '05-12-2023'),
(218, 608, 'SLT', 'Nom456', 'ecl', 'p1', 'present', '05-12-2023'),
(219, 768, 'SLT', 'Nom345', 'ecl', 'p1', 'present', '05-12-2023'),
(220, 922, 'MAJ', 'Nom789', 'ecl', 'p1', 'present', '05-12-2023'),
(221, 185, 'MAJ', 'Nom678', 'ecl', 'p1', 'present', '05-12-2023'),
(222, 982, 'ADC', 'Nom901', 'ecl', 'p1', 'present', '05-12-2023'),
(223, 183, 'ADJ', 'Nom456', 'ecl', 'p1', 'present', '05-12-2023'),
(224, 614, 'SCH', 'Nom234', 'ecl', 'p1', 'present', '05-12-2023'),
(225, 219, 'SCH', 'Nom123', 'ecl', 'p1', 'present', '05-12-2023'),
(226, 517, 'MDL', 'Nom012', 'ecl', 'p1', 'present', '05-12-2023'),
(227, 635, 'MDL', 'Nom123', 'ecl', 'p1', 'present', '05-12-2023'),
(228, 947, 'SGT', 'Nom234', 'ecl', 'p1', 'present', '05-12-2023'),
(229, 201, 'SGT', 'Nom123', 'ecl', 'p1', 'present', '05-12-2023'),
(230, 916, 'BCH1', 'Nom012', 'ecl', 'p1', 'present', '05-12-2023'),
(231, 882, 'BCH1', 'Nom901', 'ecl', 'p1', 'present', '05-12-2023'),
(232, 771, 'CCH1', 'Nom789', 'ecl', 'p1', 'present', '05-12-2023'),
(233, 832, 'CCH1', 'Nom678', 'ecl', 'p1', 'present', '05-12-2023'),
(234, 757, 'BCH', 'Nom123', 'ecl', 'p1', 'present', '05-12-2023'),
(235, 3, 'BCH', 'Nom012', 'ecl', 'p1', 'present', '05-12-2023'),
(236, 99, 'CCH', 'Nom678', 'ecl', 'p1', 'present', '05-12-2023'),
(237, 310, 'CCH', 'Nom567', 'ecl', 'p1', 'present', '05-12-2023'),
(238, 566, 'BRI', 'Nom456', 'ecl', 'p1', 'present', '05-12-2023'),
(239, 347, 'BRI', 'Nom345', 'ecl', 'p1', 'present', '05-12-2023'),
(240, 180, 'CPL', 'Nom567', 'ecl', 'p1', 'present', '05-12-2023'),
(241, 137, 'CPL', 'Nom456', 'ecl', 'p1', 'present', '05-12-2023'),
(242, 326, '1CL', 'Nom678', 'ecl', 'p1', 'present', '05-12-2023'),
(243, 639, '1CL', 'Nom567', 'ecl', 'p1', 'present', '05-12-2023'),
(244, 30, 'DGN', 'Nom012', 'ecl', 'p1', 'present', '05-12-2023'),
(245, 854, 'DGN', 'Nom901', 'ecl', 'p1', 'present', '05-12-2023'),
(246, 413, 'CDT', 'Nom789', 'ecl', 'p1', 'present', '06-12-2023'),
(247, 774, 'COL', 'Nom234', 'ecl', 'p1', 'present', '06-12-2023'),
(248, 838, 'COL', 'Nom345', 'ecl', 'p1', 'present', '06-12-2023'),
(249, 623, 'LCL', 'Nom890', 'ecl', 'p1', 'present', '06-12-2023'),
(250, 83, 'CES', 'Nom789', 'ecl', 'p1', 'present', '06-12-2023'),
(251, 59, 'CES', 'Nom890', 'ecl', 'p1', 'present', '06-12-2023'),
(252, 406, 'CNE', 'Nom456', 'ecl', 'p1', 'present', '06-12-2023'),
(253, 123, 'CNE', 'Nom567', 'ecl', 'p1', 'present', '06-12-2023'),
(254, 815, 'LTN', 'Nom345', 'ecl', 'p1', 'present', '06-12-2023'),
(255, 857, 'LTN', 'Nom234', 'ecl', 'p1', 'present', '06-12-2023'),
(256, 608, 'SLT', 'Nom456', 'ecl', 'p1', 'present', '06-12-2023'),
(257, 768, 'SLT', 'Nom345', 'ecl', 'p1', 'present', '06-12-2023'),
(258, 501, 'ASP', 'Nom123', 'ecl', 'p1', 'present', '06-12-2023'),
(259, 922, 'MAJ', 'Nom789', 'ecl', 'p1', 'present', '06-12-2023'),
(260, 185, 'MAJ', 'Nom678', 'ecl', 'p1', 'present', '06-12-2023'),
(261, 982, 'ADC', 'Nom901', 'ecl', 'p1', 'present', '06-12-2023'),
(262, 230, 'ADC', 'Nom890', 'ecl', 'p1', 'present', '06-12-2023'),
(263, 183, 'ADJ', 'Nom456', 'ecl', 'p1', 'present', '06-12-2023'),
(264, 614, 'SCH', 'Nom234', 'ecl', 'p1', 'present', '06-12-2023'),
(265, 219, 'SCH', 'Nom123', 'ecl', 'p1', 'present', '06-12-2023'),
(266, 517, 'MDL', 'Nom012', 'ecl', 'p1', 'present', '06-12-2023'),
(267, 635, 'MDL', 'Nom123', 'ecl', 'p1', 'present', '06-12-2023'),
(268, 947, 'SGT', 'Nom234', 'ecl', 'p1', 'present', '06-12-2023'),
(269, 201, 'SGT', 'Nom123', 'ecl', 'p1', 'present', '06-12-2023'),
(270, 916, 'BCH1', 'Nom012', 'ecl', 'p1', 'present', '06-12-2023'),
(271, 882, 'BCH1', 'Nom901', 'ecl', 'p1', 'present', '06-12-2023'),
(272, 771, 'CCH1', 'Nom789', 'ecl', 'p1', 'present', '06-12-2023'),
(273, 832, 'CCH1', 'Nom678', 'ecl', 'p1', 'present', '06-12-2023'),
(274, 757, 'BCH', 'Nom123', 'ecl', 'p1', 'present', '06-12-2023'),
(275, 3, 'BCH', 'Nom012', 'ecl', 'p1', 'present', '06-12-2023'),
(276, 99, 'CCH', 'Nom678', 'ecl', 'p1', 'present', '06-12-2023'),
(277, 310, 'CCH', 'Nom567', 'ecl', 'p1', 'present', '06-12-2023'),
(278, 566, 'BRI', 'Nom456', 'ecl', 'p1', 'present', '06-12-2023'),
(279, 347, 'BRI', 'Nom345', 'ecl', 'p1', 'present', '06-12-2023'),
(280, 180, 'CPL', 'Nom567', 'ecl', 'p1', 'present', '06-12-2023'),
(281, 137, 'CPL', 'Nom456', 'ecl', 'p1', 'present', '06-12-2023'),
(282, 326, '1CL', 'Nom678', 'ecl', 'p1', 'present', '06-12-2023'),
(283, 639, '1CL', 'Nom567', 'ecl', 'p1', 'present', '06-12-2023'),
(284, 30, 'DGN', 'Nom012', 'ecl', 'p1', 'present', '06-12-2023'),
(285, 854, 'DGN', 'Nom901', 'ecl', 'p1', 'present', '06-12-2023'),
(286, 815, 'LTN', 'Nom345', 'ecl', 'p1', 'mission', '06-01-2024'),
(287, 922, 'MAJ', 'Nom789', 'ecl', 'p1', 'arret', '06-01-2024'),
(288, 566, 'BRI', 'Nom456', 'ecl', 'p1', 'malade', '06-01-2024'),
(289, 916, 'BCH1', 'Nom012', 'ecl', 'p1', 'abs', '06-01-2024'),
(290, 635, 'MDL', 'Nom123', 'ecl', 'p1', 'present', '06-01-2024'),
(291, 922, 'MAJ', 'Nom789', 'ecl', 'p1', 'arret', '05-03-2024'),
(292, 815, 'LTN', 'Nom345', 'ecl', 'p1', 'malade', '05-03-2024'),
(293, 635, 'MDL', 'Nom123', 'ecl', 'p1', 'deserteur', '05-03-2024'),
(294, 916, 'BCH1', 'Nom012', 'ecl', 'p1', 'present', '05-03-2024'),
(295, 566, 'BRI', 'Nom456', 'ecl', 'p1', 'present', '05-03-2024');

-- --------------------------------------------------------

--
-- Structure de la table `ue_peloton`
--

CREATE TABLE `ue_peloton` (
  `id` int(11) NOT NULL,
  `ue` int(11) NOT NULL,
  `nom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ue_peloton`
--

INSERT INTO `ue_peloton` (`id`, `ue`, `nom`) VALUES
(15, 8, 'p1'),
(16, 8, 'p2');

-- --------------------------------------------------------

--
-- Structure de la table `unite`
--

CREATE TABLE `unite` (
  `id` int(11) NOT NULL,
  `unite` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `unite`
--

INSERT INTO `unite` (`id`, `unite`) VALUES
(1, '1esc'),
(2, '2esc'),
(3, '3esc'),
(4, '1cie'),
(5, '2cie'),
(6, 'capp'),
(7, 'eir'),
(8, 'ecl'),
(9, 'autre');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `ue` text NOT NULL,
  `peloton` text NOT NULL,
  `role` text NOT NULL,
  `delegate_role` text NOT NULL,
  `statut` int(11) NOT NULL,
  `nid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `ue`, `peloton`, `role`, `delegate_role`, `statut`, `nid`) VALUES
(1, 'admin', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'cdb', '', 1, 635),
(2, 'test', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'cds', '', 1, 566),
(3, 'ge', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'sec', '', 1, 0),
(4, '1esc', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', '1esc', 'ge', '', '', 1, 0),
(5, 'pax', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'pax', '', 1, 815),
(6, 'chef', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'chef', '', 1, 0),
(7, 'rh', '$2y$10$dePD3IxYuFfOGqMlBoEgOeymRTMsKI1/T8IcyCESUky3pEUEaTaFu', 'ecl', 'p1', 'rh', '', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `calendrier`
--
ALTER TABLE `calendrier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid` (`nid`,`jour`);

--
-- Index pour la table `demande_absence`
--
ALTER TABLE `demande_absence`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ordre` (`ordre`);

--
-- Index pour la table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grade` (`grade`);

--
-- Index pour la table `militaire`
--
ALTER TABLE `militaire`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grade` (`grade`,`ue`,`peloton`,`nid`),
  ADD UNIQUE KEY `nid` (`nid`),
  ADD KEY `peloton` (`peloton`),
  ADD KEY `ue` (`ue`);

--
-- Index pour la table `motifs`
--
ALTER TABLE `motifs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `peloton`
--
ALTER TABLE `peloton`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `peloton` (`peloton`);

--
-- Index pour la table `rtt`
--
ALTER TABLE `rtt`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `spa`
--
ALTER TABLE `spa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grade` (`grade`,`nom`,`ue`,`peloton`,`statut`,`jour`);

--
-- Index pour la table `ue_peloton`
--
ALTER TABLE `ue_peloton`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `unite`
--
ALTER TABLE `unite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=842;

--
-- AUTO_INCREMENT pour la table `demande_absence`
--
ALTER TABLE `demande_absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT pour la table `fonction`
--
ALTER TABLE `fonction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `militaire`
--
ALTER TABLE `militaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pour la table `motifs`
--
ALTER TABLE `motifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `peloton`
--
ALTER TABLE `peloton`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `rtt`
--
ALTER TABLE `rtt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `spa`
--
ALTER TABLE `spa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=296;

--
-- AUTO_INCREMENT pour la table `ue_peloton`
--
ALTER TABLE `ue_peloton`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `unite`
--
ALTER TABLE `unite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `militaire`
--
ALTER TABLE `militaire`
  ADD CONSTRAINT `militaire_ibfk_1` FOREIGN KEY (`grade`) REFERENCES `grade` (`id`),
  ADD CONSTRAINT `militaire_ibfk_2` FOREIGN KEY (`peloton`) REFERENCES `peloton` (`id`),
  ADD CONSTRAINT `militaire_ibfk_3` FOREIGN KEY (`ue`) REFERENCES `unite` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
