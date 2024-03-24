<?php

    // Paramètres de la base de données
    $host = "localhost";
    $dbname = "spa";
    $user = "root";
    $password = "";


    // Connexion à la base de données
    try {
        $bdd = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        // Configuration des erreurs PDO pour afficher les erreurs
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo "Erreur de connexion à la base de données: " . $e->getMessage();
    } 

    
?>
