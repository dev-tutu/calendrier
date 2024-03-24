<?php


    // Inclure le fichier de connexion à la base de données
    include "../../bdd.php";

    /**
     * Récupère toutes les données de la table calendrier.
     *
     * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
     *
     * @return array - Un tableau associatif contenant les données de la table calendrier.
     *
     * @throws Exception en cas d'erreur lors de la récupération des données du calendrier.
     */

    function getCalendrier($bdd) {
        try {
            // Sélectionner toutes les données de la table calendrier
            $query = "SELECT * FROM calendrier";
            $result = $bdd->query($query);
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // En cas d'erreur lors de la requête, afficher une erreur
            throw new Exception("Erreur lors de la récupération des données du calendrier : " . $e->getMessage());
        }
    }

    try {
        // Appeler la fonction pour récupérer les données du calendrier
        $calendrier = getCalendrier($bdd);

        // Afficher le résultat en JSON
        echo json_encode($calendrier);
    } catch (Exception $e) {
        // En cas d'erreur, afficher l'erreur en JSON
        echo json_encode(["error" => $e->getMessage()]);
    }

    // Fermer la connexion à la base de données
    $bdd = null;


    
?>