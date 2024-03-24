<?php

  //Verification de l'utilisateur

  require('bdd.php');
  require('./assets/php/militaireFunctions.php');
    

    $_SESSION['role'] = "pax";
    $_SESSION['unite'] = "ecl";
    $_SESSION['peloton'] = "p1";

 


  // Récupération des données
  $militaire = $_SESSION['role'] == "ge" ?  militaryByUe($_SESSION['unite'], $bdd) : militarySection($_SESSION['unite'], $_SESSION['peloton'], $bdd);

 
  $calendrier = getCalendrier($bdd);

   
  $query = "SELECT * FROM `motifs` WHERE 1";
  $result = $bdd->query($query);
  $colorClass = $result->fetchAll(PDO::FETCH_ASSOC);

  

  $requete = $bdd->query("SELECT * FROM `rtt` WHERE 1");
  $rtt = $requete->fetchAll(PDO::FETCH_ASSOC);

  $poste = 1;





    $chaine = $bdd->prepare("SELECT u.id, u.username FROM users u 
    WHERE u.role = (SELECT nom FROM fonction WHERE ordre = (SELECT ordre FROM fonction WHERE nom = :role) + $poste) 
    AND ue = :unite and statut = 1;");
      
          
       // Exécution de la requête avec les paramètres
  $chaine->execute(array(
    'role' => $_SESSION['role'],
    'unite' =>  $_SESSION['unite']
  ));



      $poste++;

  

 
  
      

  $chaine =  $chaine->fetchAll(PDO::FETCH_ASSOC);







?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <!-- Inclusion du fichier CSS pour la mise en forme -->
    <link rel="stylesheet" href="./assets/css/style.css">

    <!-- Inclure Bootstrap JS et les dépendances Popper.js et jQuery -->
    <script src="./assets/js/lib/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/lib/popper.min.js"></script>
    <script src="./assets/js/lib/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./assets/css/bootstrap.min.css">

    <!-- Script pour initialiser les données JavaScript -->
    <script>
        const militaire = <?php echo json_encode($militaire); ?>;
        let calendrier = <?php echo json_encode($calendrier); ?>;
        const AllInfoCell = <?php echo json_encode($colorClass); ?>;
        const Allrtt = <?php echo json_encode($rtt); ?>; 
        const chaine = <?php echo json_encode($chaine); ?> ;

        console.log(chaine)


        
    </script>
    
  </head>

  <body>

    <!-- Contenu de la page -->
    <label for="mois">Sélectionnez un mois :</label>
    <input type="text" id="mois" name="mois" readonly>

    <div class="button-container">
        <button id="moisPrecedent">&lt;</button>
        <button id="moisSuivant">&gt;</button>
    </div>

    <table>
        <thead>
        <tr>
            <th rowspan="2">Name</th>
            <th colspan="31" id="month"></th>
        </tr>
        <tr id="days"></tr>
        </thead>
        <tbody id="militaire"></tbody>
    </table>


    <!-- Scripts JavaScript -->
    <script src="./assets/js/catholiqueDate.js"></script>
    <script src="./assets/js/cellule.js"></script>
    <script src="./assets/js/run.js"></script>
  </body>

</html>



