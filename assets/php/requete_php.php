<?php

include "../../bdd.php";






// Récupération des données depuis la base de données
$query = "SELECT `lib_long` FROM `motifs` WHERE `lib_court` = 's'";
$result = $bdd->query($query);

$data = $result->fetchAll(PDO::FETCH_ASSOC);

    // Conversion du tableau en format JSON
    $jsonData = json_encode($data);

    // Affichage du tableau JSON
    echo $jsonData;




?>