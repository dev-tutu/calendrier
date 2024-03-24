# calendrier

<img width="1414" alt="image" src="https://github.com/dev-tutu/calendrier/assets/164091895/edcd8353-b568-4b46-8996-4613bf64cbe9">

Crèation d'un calendrier 

## Composition

### Calendrier

calendrier français pour les dépôts d'évènements, avec les jours fériés : 

  - 1er janvier
  - Lundi de Pâques
  - 1er mai
  - 8 mai
  - Ascension
  - Lundi de Pentecôte
  - 14 juillet
  - Assomption
  - Toussaint
  - 11 novembre
  - 25 décembre

  - RTT
  - Jours fériés locaux

vérifie si l'année est bissextile :

  - 29 février
  - 28 février

Changement des années automatique

### dépôt d'évènements

<img width="503" alt="image" src="https://github.com/dev-tutu/calendrier/assets/164091895/b9eaf617-0027-4879-873d-905e223b7264">

Utilisation d'une fenetre modal pour éffectuer un dépôt d'évenements

*Selection d'une raison :*

 - Permission
 - Mission
 - Formation
 - Opex
 - Maladie
 - Autre ...

*Selection d'une date :*

 - Date début
 - Date fin

*Selection d'un intervalle :*

 - Matin
 - Midi
 - Journée

*Ajout d'une description*

La demande est alors automatiquement envoyer à son chef directe pour validation **(autre module)** et permet une visualtion pour la personne ayant émis sa demande **(autre module)**


### Visualisation

En fonction de la raison une indication est placer sur sur le calendrier

<img width="1107" alt="image" src="https://github.com/dev-tutu/calendrier/assets/164091895/128e6952-bdc1-47ce-abbf-afdd0d6bd7f5">

## Utilisation

1. Serveur de BDD

   - vous devez avoir un serveur de bdd déjà installer
   - import le script sql spa.sql
  
2. Serveur Apache & PHP

   - Vous devez avoir un serveur apache déjà installer avec PHP
   - Vous devez importer le back et front dans le apache
  
3. Crèation de la communication

   - pour permettre la communication entre le back et la BDD vous devez modifier les variables dans le fichier bdd.php
  
   ```
    $host = "localhost"; (nom dns / @IP)
    $dbname = "spa"; (nom de la database)
    $user = "root"; (nom de l'utilisateur)
    $password = ""; (password)
   ```






    
