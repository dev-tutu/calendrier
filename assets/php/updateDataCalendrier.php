<?php


    /**
     * Traite une requête POST pour l'ajout ou la mise à jour des données dans la table "calendrier".
     *
     * @throws Exception si la connexion à la base de données n'est pas établie.
     */
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Inclusion du fichier de connexion à la base de données
        include "../../bdd.php";

        try {
            // Vérification si la connexion à la base de données est établie
            if (!$bdd instanceof PDO) {
                throw new Exception("La connexion à la base de données n'est pas établie.");
                http_response_code(400); // Mauvaise requête
                exit();
            }

            // Récupération des données POST
            $data = $_POST;
            $dateStart = htmlentities($data[2]);
            $dateEnd = htmlentities($data[3]);
            $nid = htmlentities($data[4]);
            $value = createClassColor(htmlentities($data[5]),$bdd);

            // Liste des jours entre deux dates
            $listeJoursMois = listeJoursMoisEntreDeuxDates($dateStart, $dateEnd);

            // Préparation de la requête SQL
            $requete = $bdd->prepare('INSERT INTO calendrier (jour, nid, txt)
                VALUES (:jour, :nid, :txt)
                ON DUPLICATE KEY UPDATE txt = :txt;');

            // Exécution de la requête pour chaque jour dans la liste
            foreach ($listeJoursMois as $date) {
                $requete->execute([
                    'jour' => $date,
                    'nid' => $nid,
                    'txt' => $value
                ]);
            }

            // Fermeture de la connexion à la base de données
            $bdd = null;
        } catch (Exception $e) {
            http_response_code(400); // Mauvaise requête
            exit($e->getMessage());
        }
    }

    /**
     * Génère une liste de jours entre deux dates inclusives.
     *
     * @param string $dateDebut - La date de début au format 'YYYY-MM-DD'.
     * @param string $dateFin - La date de fin au format 'YYYY-MM-DD'.
     *
     * @return array - Un tableau contenant les jours entre les deux dates.
     */
    function listeJoursMoisEntreDeuxDates($dateDebut, $dateFin)
    {
        $dateFin = $dateFin == "" ? $dateDebut : $dateFin;

        if ($dateDebut != "" && $dateFin != "" && $dateFin >= $dateDebut) {
            $dateDebut = new DateTime($dateDebut);
            $dateFin = new DateTime($dateFin);
            $dateFin->modify('+1 day'); // Ajouter un jour à la date de fin pour inclure la dernière journée

            $interval = new DateInterval('P1D'); // Période d'un jour
            $dateRange = new DatePeriod($dateDebut, $interval, $dateFin);

            $resultat = [];

            foreach ($dateRange as $date) {
                $mois = $date->format('m'); // Numéro du mois (de 01 à 12)
                $jour = $date->format('d'); // Jour du mois
                $annee = $date->format('Y'); // Année

                $resultat[] = "$jour-$mois-$annee";
            }

            return $resultat;
        }

        return [];
    }
    
    /**
     * Retourne le libellé court associé à une valeur donnée en effectuant une recherche dans la table `motifs`.
     *
     * @param string $value - La valeur pour laquelle rechercher le libellé court.
     * @param PDO $bdd - L'objet PDO représentant la connexion à la base de données.
     *
     * @return string - Le libellé court correspondant à la valeur donnée. Retourne une chaîne vide si aucun résultat n'est trouvé.
     */
    function createClassColor($value, $bdd)
    {
        try {
            // Exécution de la requête
            $requete = $bdd->prepare("SELECT `lib_court` FROM `motifs` WHERE `lib_long` = :value");
            $requete->bindParam(':value', $value);
            $requete->execute();
    
            // Récupération du résultat
            $resultat = $requete->fetch(PDO::FETCH_ASSOC);
    
            $libCourt = '';
    
            // Traitement du résultat
            if ($resultat) {
                $libCourt = $resultat['lib_court'];
                echo "Libellé court pour '$value' : $libCourt";
            } else {
                echo "Aucun résultat trouvé pour '$value'.";
            }
    
            // Pas besoin de fermer la connexion ici, elle peut être réutilisée à d'autres endroits
    
            // Si la valeur est présente dans l'objet $classes, on renvoie la classe correspondante
            // Sinon, on renvoie une chaîne vide
            return $libCourt != '' ? $libCourt : '';
        } catch (PDOException $e) {
            // En cas d'erreur, afficher le message d'erreur
            echo "Erreur : " . $e->getMessage();
            // Retourner une chaîne vide en cas d'erreur
            return '';
        }
    }
    
    
    
?>