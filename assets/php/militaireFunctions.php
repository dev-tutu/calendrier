<?php

    /**
   * Exécute une requête pour récupérer les données des militaires en fonction des critères fournis.
   *
   * @param string $unite - L'unité à laquelle les militaires appartiennent.
   * @param string|null $peloton - Le peloton auquel les militaires appartiennent (peut être nul).
   * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
   * @param string $condition - La condition pour filtrer les résultats.
   *
   * @return array - Un tableau associatif contenant les données des militaires.
   *
   * @throws InvalidArgumentException si les paramètres obligatoires ne sont pas fournis.
   * @throws Exception en cas d'erreur lors de la récupération des données depuis la base de données.
   */


  function executeMilitaireQuery($unite, $peloton, $bdd, $condition) {
    
    $unite = filter_var($unite, FILTER_SANITIZE_SPECIAL_CHARS);
    $peloton = $peloton ? filter_var($peloton, FILTER_SANITIZE_SPECIAL_CHARS) : null;

    if (empty($unite) || ($peloton && empty($peloton))) {
        throw new InvalidArgumentException("Les paramètres 'unite' et 'peloton' sont obligatoires.");
    }

    // Récupération des grades depuis la table grade
    $gradesQuery = "SELECT grade FROM grade";
    $grades = $bdd->query($gradesQuery)->fetchAll(PDO::FETCH_COLUMN);

    if ($grades === false) {
        throw new Exception("Erreur lors de la récupération des grades : " . implode(", ", $bdd->errorInfo()));
    }

    // Préparation de la requête avec les grades dynamiques
    $gradePlaceholders = implode(',', array_fill(0, count($grades), '?'));

    // Utiliser des paramètres de position également pour les conditions
    $condition = str_replace([':ue', ':peloton'], ['?', '?'], $condition);

    // Modifier la requête pour sélectionner le champ grade au lieu de l'id
    $requete = $bdd->prepare("SELECT m.*, g.grade AS grade
        FROM militaire m
        INNER JOIN grade g ON g.id = m.grade
        INNER JOIN peloton p ON p.id = m.peloton
        INNER JOIN unite u ON u.id = m.ue
        WHERE $condition
        ORDER BY g.ordre DESC");


    $requete->bindParam(1, $unite);
    if ($peloton) {
        $requete->bindParam(2, $peloton);
    }

    $requete->execute();

    return $requete->fetchAll(PDO::FETCH_ASSOC);
  }


  /**
   * Récupère les données des militaires en fonction de l'unité et du peloton spécifiés.
   *
   * @param string $unite - L'unité à laquelle les militaires appartiennent.
   * @param string $peloton - Le peloton auquel les militaires appartiennent.
   * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
   *
   * @return array - Un tableau associatif contenant les données des militaires.
   */

  function militarySection($unite, $peloton, $bdd) {
    $condition = "u.unite = :ue AND p.peloton = :peloton";
    return executeMilitaireQuery($unite, $peloton, $bdd, $condition);
  }

  /**
   * Récupère les données des militaires en fonction de l'unité spécifiée.
   *
   * @param string $unite - L'unité à laquelle les militaires appartiennent.
   * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
   *
   * @return array - Un tableau associatif contenant les données des militaires.
   */

  function militaryByUe($unite, $bdd) {
    $condition = "u.unite = :ue";
    return executeMilitaireQuery($unite, null, $bdd, $condition);
  }

  /**
   * Récupère toutes les données de la table calendrier.
   *
   * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
   *
   * @return array - Un tableau associatif contenant les données de la table calendrier.
   *
   * @throws Exception en cas d'erreur lors de l'exécution de la requête.
   */

  function getCalendrier($bdd) {
    if (!$bdd instanceof PDO) {
        throw new Exception("La connexion à la base de données n'est pas établie.");
    }

    $query = "SELECT * FROM calendrier";
    $result = $bdd->query($query);

    if ($result === false) {
        throw new Exception("Erreur lors de l'exécution de la requête : " . implode(", ", $bdd->errorInfo()));
    }

    return $result->fetchAll(PDO::FETCH_ASSOC);
  }



?>