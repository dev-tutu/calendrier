<?php

    // Vérification si la requête est une requête POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Inclusion du fichier de connexion à la base de données
        include "../../bdd.php";

        // Vérification si la connexion à la base de données est établie
        if (!$bdd instanceof PDO) {
            http_response_code(400); // Mauvaise requête
            exit("La connexion à la base de données n'est pas établie.");
        }

        // Vérification si les variables POST existent
        if (isset($_POST['date_deb'], $_POST['date_end'], $_POST['nid'], $_POST['motif'], $_POST['day'])) {

           
            // Validation des valeurs des variables POST
            $date_deb = $_POST["date_deb"];
            $date_end = $_POST["date_end"];
            $nid = $_POST["nid"];
            $motif = $_POST["motif"];
            $day = $_POST["day"];
            $description  = $_POST["description"];
            $valideur  = $_POST["valideur"];
            $day_total = $_POST['day_total'];

             

            // Préparation de la requête pour vérifier les chevauchements
            $requeteOverlap = $bdd->prepare("SELECT * FROM demande_absence 
                WHERE nid = :nid 
                AND ((debut BETWEEN :dateDebut AND :dateFin) OR (fin BETWEEN :dateDebut AND :dateFin))");

            // Exécution de la requête avec les paramètres
            $requeteOverlap->execute(array(
                'nid' => $nid,
                'dateDebut' => $date_deb,
                'dateFin' => $date_end
            ));

            $dateDebut = new DateTime($date_deb);
            $dateFin = new DateTime($date_end);

            $weekendCount = 0;
         

            while ($dateDebut <= $dateFin) {
                // Vérifier si le jour actuel est un week-end (samedi ou dimanche)
                if ($dateDebut->format('N') >= 6) {
                    $weekendCount++;
                }

                // Passer au jour suivant
                $dateDebut->modify('+1 day');
            }

            
            $query = "SELECT COUNT(*) FROM `rtt` WHERE `date_RTT` BETWEEN :debut AND :fin";
            $sql = $bdd->prepare($query);
            $sql->bindParam(':debut', $date_deb, PDO::PARAM_STR);
            $sql->bindParam(':fin', $date_end, PDO::PARAM_STR);
            $sql->execute();
            $weekendCount += $sql->fetchColumn();

            
  
            $resultOverlap = $requeteOverlap->fetchAll();

            

            if (count($resultOverlap) > 0) {

                // Il existe déjà une demande d'absence qui chevauche la période spécifiée
                echo "false";
            } else {

                
                $dateActuelle = date("Y-m-d");

                // Préparation de la requête pour l'insertion
                $sqlInsert = $bdd->prepare("INSERT INTO demande_absence (nid, debut, fin, visa, motif, jour,descript,depot,valideur,day_deduction) 
                    VALUES (:nid, :dateDebut, :dateFin, :visa, :motif, :jour, :descript,:depot, :valideur, :day_total)");


                // Exécution de la requête d'insertion avec les paramètres
                $resultInsert = $sqlInsert->execute(array(
                    'nid' => $nid,
                    'dateDebut' => $date_deb,
                    'dateFin' => $date_end,
                    'visa' => 0,
                    'motif' => $motif,
                    'jour' => $day,
                    'descript' => $description,
                    'depot' => $dateActuelle,
                    'valideur' => $valideur,
                    'day_total' => ($day - $weekendCount) ,
                ));

                

                if ($resultInsert) {
                    echo "true";
                } else {
                    echo "false";
                    //echo "Erreur lors de l'insertion de la demande d'absence : " . implode(", ", $requeteOverlap->errorInfo());
                }
                  
            }
          
        } else {
            echo "false";
            http_response_code(400); // Mauvaise requête
        }
    } else {
        echo "false";
        http_response_code(400); // Mauvaise requête
    }

?>
