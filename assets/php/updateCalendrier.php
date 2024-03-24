<?php

    // Vérification si la requête est une requête POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Inclusion du fichier de connexion à la base de données
        include "../../bdd.php";

        try {
            // Vérification si la connexion à la base de données est établie
            if (!$bdd instanceof PDO) {
                throw new Exception("La connexion à la base de données n'est pas établie.");
            }

            // Vérification si les variables POST existent
            if (isset($_POST['date'], $_POST['nid'], $_POST['value'])) {
                // Validation des valeurs des variables POST
                $date = htmlentities($_POST['date']);
                $nid = htmlentities($_POST['nid']);
                $value = htmlentities($_POST['value']);

                // Validation du format de la date
                if (!preg_match('/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/', $date)) {
                    throw new InvalidArgumentException("Format de date invalide.");
                }

                // Validation des types de données
                if (!is_numeric($nid) || !is_string($value)) {
                    throw new InvalidArgumentException("Type de données invalide.");
                }

                // Préparation de la requête avec des paramètres nommés
                $requete = $bdd->prepare('INSERT INTO calendrier (jour, nid, txt)
                                        VALUES (:jour, :nid, :txt)
                                        ON DUPLICATE KEY UPDATE txt = :txt;');

                // Exécution de la requête avec les paramètres
                $requete->execute([
                    'jour' => $date,
                    'nid' => $nid,
                    'txt' => $value
                ]);

                // Fermeture de la connexion à la base de données
                $bdd = null;
                echo "success"; // Ou toute autre réponse appropriée
            } else {
                throw new InvalidArgumentException("Paramètres manquants.");
            }
        } catch (Exception $e) {
            http_response_code(400); // Mauvaise requête
            echo $e->getMessage();
        }
    }
?>
