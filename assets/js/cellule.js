let clicActuel = 1; // État actuel : 1 pour le premier clic, 2 pour le deuxième clic
let premiereCellule = null;
let deuxiemeCellule = null;


/**
 * Affiche le mois correspondant à l'index donné
 * @param {number} index - l'index du mois à afficher
 */
function afficherMois(index) {
  moisInput.value = monthInLetters[index] || '';
}

/**
 * Crée les jours dans l'en-tête du tableau, ajoute la classe "wk" aux jours de week-end,
 * et stocke les jours de week-end dans le tableau weekends.
 * @param {Array} daysInMonth - Le nombre de jours dans le mois en cours
 * @param {String} moisInput - Le mois en cours sous forme de chaîne de caractères
 * @param {Array} weekends - Le tableau des jours de week-end
 * @param {Array} monthInLetters - Le tableau des noms de mois en toutes lettres
 * @returns {Array} weekends - Le tableau mis à jour des jours de week-end
 */
function createDays(daysInMonth, moisInput, weekends, year) {
  const tr = document.getElementById("days");

  for (let i = 1; i <= daysInMonth[moisInput]; i++) {
    const date = new Date(year.getFullYear(), monthNumber[moisInput] - 1, i);
    const jourSemaine = date.getDay();

    const th = document.createElement("th");
    th.textContent = i.toString();

    if (jourSemaine === 0 || jourSemaine === 6 || holidays.includes(`${i}-${monthNumber[moisInput]}`)) {
      th.classList.add("wk");
      weekends.push(i);
    }

    tr.appendChild(th);
  }

  return weekends;
}



/**
 * Renvoie le lib_long correspondant au lib_court de l'activité depuis le tableau AllInfoCell.
 *
 * @param {string} value - Lib_court du statut du militaire.
 * @param {Array} AllInfoCell - Tableau d'objets représentant les informations des cellules.
 * @returns {string} - Le lib_long correspondant ou une chaîne vide si aucune correspondance n'est trouvée.
 */
function createClassColor(value, AllInfoCell) {
  const matchingInfo = AllInfoCell.find(info => info.lib_court === value);
  return matchingInfo ? matchingInfo.lib_long : '';
}

/**
 * Renvoie le lib_court correspondant au lib_long de l'activité depuis le tableau AllInfoCell.
 *
 * @param {string} value - Lib_long du statut du militaire.
 * @param {Array} AllInfoCell - Tableau d'objets représentant les informations des cellules.
 * @returns {string} - Le lib_court correspondant ou une chaîne vide si aucune correspondance n'est trouvée.
 */
function getColorClass(value, AllInfoCell) {
  const matchingInfo = AllInfoCell.find(info => info.lib_long === value);
  return matchingInfo ? matchingInfo.lib_court : '';
}

/**
 * Renvoie un tableau contenant toutes les valeurs de lib_long depuis le tableau AllInfoCell.
 *
 * @param {Array} AllInfoCell - Tableau d'objets représentant les informations des cellules.
 * @returns {Array|null} - Un tableau de lib_long ou null si aucune correspondance n'est trouvée.
 */
function getLibLongValues(AllInfoCell) {
  return AllInfoCell.map(info => info.lib_long);
}
  

/**
 * Crée les cellules du tableau correspondant au mois et à la liste de militaires fournis
 * @param {Array} militaire - Liste des militaires à afficher dans le tableau
 * @param {string} moisInput - Mois à afficher dans le tableau (au format "mm")
 * @param {Date} year - Objet Date représentant l'année actuelle
 * @returns {Promise<void>} - Une promesse résolue une fois que les cellules sont créées
 */

async function createCell(militaire, moisInput,year) {

  console.log('ok')
  const anneeActuelle = year.getFullYear();


  

  try {
    // Récupération des données du calendrier depuis le serveur
    const fetchCalendrier = await fetch("./assets/php/readCalendrier.php");
    const calendrier = await fetchCalendrier.json();

    calendrier.forEach(entry => {
      // Vérifier si le premier caractère du jour est un 0
      if (entry.jour.charAt(0) === '0') {
        // Supprimer le 0 en première position du jour
        entry.jour = entry.jour.substring(1);
      }
    });

    const tr = document.getElementById("militaire");

    // Boucle sur chaque militaire pour créer une ligne du tableau correspondante
    elt = 0;
    for (const element of militaire) {
      const th = document.createElement("tr");
      const td = document.createElement("td");
      td.classList.add("editable");
      td.textContent = `${element.grade} ${element.nom}`;
      th.appendChild(td);

      // Récupération des événements du calendrier pour le militaire en cours
      const calendrierByNid = calendrier
        .filter((elt) => elt.nid === element.nid.toString())
        .reduce((acc, cur) => {
          acc[cur.jour] = cur.txt;
          return acc;
        }, {});

        

      // Boucle sur chaque jour du mois pour créer la cellule correspondante dans la ligne
      for (let i = 1; i <= daysInMonth[moisInput]; i++) {
        const dateActuel = `${i}-${monthNumber[moisInput]}-${anneeActuelle}`;
        const td = document.createElement("td");
        td.onclick = function () {
          editCell(this,dateActuelle);
        };

        // Ajout de la classe "wk_nb" aux cellules des weekends ou jours fériés
        const dayFormatted = i < 10 ? `0${i}` : i;

        if (weekends.includes(i) || holidays.includes(`${dayFormatted}-${monthNumber[moisInput]}`)) {
            td.classList.add("wk_nb");
        }

      

        

        // Si un événement est associé à la date courante pour le militaire en cours, on l'affiche dans la cellule
        if (calendrierByNid[dateActuel]) {
          console.log(calendrierByNid[dateActuel])
          const classe = createClassColor(calendrierByNid[dateActuel],AllInfoCell);
          td.textContent = calendrierByNid[dateActuel];
          if (classe) td.classList.add(classe);
        } else {
          td.textContent = "";
        }

        // Ajout des classes correspondant au militaire et à la date dans la cellule
        td.classList.add("editable");
        td.classList.add(element.nid);
        td.classList.add(i);
        
        td.setAttribute('data-day', i);
        td.setAttribute('elt', elt);
        td.setAttribute('nid', element.nid);
        td.setAttribute('get', "");
        td.setAttribute('month',monthNumber[moisInput]);
        
        th.appendChild(td);
      }

      tr.appendChild(th);
      elt++;
    }
  } catch (error) {
    console.log("Error: " + error.message);
  }

  console.log('enf')
}




/**
 * Permet de modifier la case d'un tableau
 * @param {objet} cell - case d'un tableau
 */

function editCell(cell,year) {

  try {

    // Récupération du jour de la cellule en utilisant la dernière classe ajoutée
    const classes = [...cell.classList];

    var myday = classes[classes.length - 1];
    myday = myday < 10 ? '0' + myday : myday;

    // Création d'un champ de texte pour éditer la cellule
    //const input = document.createElement("input");
    //input.type = "text";
    //input.value = cell.innerText;

    if (clicActuel === 1) {
      // Premier clic
      premiereCellule = {
        cell: cell,
        date: `${year.getFullYear()}-${monthNumber[moisInput.value]}-${myday}`,
        nid: cell.getAttribute("nid")
      };

      cell.setAttribute("get", "true");
      changeColorIfGetIsTrue(cell);
      clicActuel = 2; // Passer à l'état de deuxième clic
    }

    else {
      // Deuxième clic
      deuxiemeCellule = {
        cell: cell,
        date: `${year.getFullYear()}-${monthNumber[moisInput.value]}-${myday}`,
        nid: cell.getAttribute("nid")
      };

      cell.setAttribute("get", "true");
      changeColorIfGetIsTrue(cell);
      clicActuel = 1; // Réinitialiser l'état pour le prochain premier clic

      if(deuxiemeCellule.nid == premiereCellule.nid) {

      intervalle = listeDays(premiereCellule.date,deuxiemeCellule.date)
    

      intervalleDaysMonth = listeDaysMonth(premiereCellule.date,deuxiemeCellule.date)
      intervalleColorDayMonth(intervalleDaysMonth,deuxiemeCellule.nid,true)
      


      
    allMotif = getLibLongValues(AllInfoCell);
    console.log("ma valeur" + allMotif);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- En-tête de la fenêtre modale -->
        <div class="modal-header">
          <h4 class="modal-title">Modifier la cellule</h4>
          <button type="button" class="close" id="headClose">&times;</button>
        </div>
  
        <!-- Corps de la fenêtre modale -->
        <div class="modal-body">

        <div class="form-group">
            <label for="modalGive">A :</label>
            <select class="form-control" id="modalGive">
            ${Array.isArray(chaine) ? chaine.map(chaineItem => `<option value="${chaineItem.id}">${chaineItem.username}</option>`).join('') : ''}
            </select>
        </div>
  
        <div class="form-group">
          <label for="modalPb">Choisissez le motif :</label>
          <select class="form-control" id="modalPb">
            ${allMotif.map(motif => `<option value="${motif}">${motif}</option>`).join('')}
          </select>
        </div>
  
          <div class="form-group">
            <label for="modalStartDate">Date de début :</label>
            <input type="date" class="form-control" id="modalStartDate" value="${premiereCellule.date}">
          </div>
  
          <div class="form-group">
            <label for="modalTimeStart">Choisissez le moment :</label>
            <select class="form-control" id="modalTimeStart">
              <option value="none"></option>
              <option value="matin">Matin</option>
              <option value="apres-midi">Après-midi</option>
              <option value="journée-complete">Journée complète</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="modalEndDate">Date de fin :</label>
            <input type="date" class="form-control" id="modalEndDate" value="${deuxiemeCellule.date}">
          </div>
  
          <div class="form-group">
            <label for="modalTimeEnd">Choisissez le moment :</label>
            <select class="form-control" id="modalTimeEnd">
              <option value="none"></option>
              <option value="matin">Matin</option>
              <option value="apres-midi">Après-midi</option>
              <option value="journée-complete">Journée complète</option>
            </select>
          </div>
  
          <!-- Ajout du champ de texte -->
          <div class="form-group">
            <label for="modalText">Description :</label>
            <input type="text" class="form-control" id="modalText" placeholder="Entrez du texte ici">
          </div>
  
        </div>
  
        <!-- Pied de la fenêtre modale -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="modalSaveBtn">Enregistrer</button>
          <button type="button" class="btn btn-secondary" id="modalCloseBtn">Fermer</button>
        </div>
  
      </div>
    </div>
  `;
  

    // Ajoutez la fenêtre modale à la fin du corps du document
    document.body.appendChild(modal);
    $(modal).modal('show');

    var modalSaveBtn = document.getElementById("modalSaveBtn");

    modalSaveBtn.addEventListener("click", function() {

      const nid = cell.getAttribute("nid");
      const modalPbValue = document.getElementById("modalPb").value;

      arraytest = getDataForm()
      listData = FormulaireData();

      requestAbsence(premiereCellule.date,deuxiemeCellule.date,premiereCellule.nid,modalPbValue, listData[0],arraytest[4],arraytest[5],arraytest[1])
  .then(response => {
    // Faire quelque chose avec la réponse
    console.log("Request successful:", response);

    if(response == "true") {



      //changeStatCell(arraytest[0],nid,modalPbValue)
      

      daysWk = listeDays(arraytest[0],arraytest[3])
      changeStatCell(daysWk,nid,modalPbValue)
        
      listData.push(nid)
      listData.push(modalPbValue)
      requestCalendar(listData)

      


    }else if(response == "false") {

      const errorModal = document.createElement("div");
      errorModal.className = "modal";
      errorModal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Erreur de traitement</h4>
              <button type="button" class="close" id="errorClose">&times;</button>
            </div>
            <div class="modal-body">
              <p>Une erreur s'est produite lors du traitement.</p>
              <p>Veuillez réessayer ou contacter l'administrateur.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="errorCloseBtn">Fermer</button>
            </div>
          </div>
        </div>
      `;
    
      // Ajoutez la fenêtre modale d'erreur à la fin du corps du document
      document.body.appendChild(errorModal);
    
      // Affichez la fenêtre modale d'erreur
      $(errorModal).modal('show');
    
      // Ajoutez un écouteur d'événements pour le bouton de fermeture de la fenêtre modale d'erreur
      const errorCloseBtn = document.getElementById('errorCloseBtn');
      const errorClose = document.getElementById('errorClose');
    
      function closeModal() {
        // Supprimez la fenêtre modale d'erreur du DOM après la fermeture
        document.body.removeChild(errorModal);
      }
    
      errorCloseBtn.addEventListener('click', function () {
        // Fermez la fenêtre modale d'erreur lors du clic sur le bouton de fermeture
        $(errorModal).modal('hide');
      });
    
      errorClose.addEventListener('click', function () {
        // Fermez la fenêtre modale d'erreur lors du clic sur le bouton de fermeture dans le coin supérieur droit
        $(errorModal).modal('hide');
      });
    
      // Utilisez l'événement 'hidden.bs.modal' pour détecter quand la fenêtre modale est complètement fermée
      $(errorModal).on('hidden.bs.modal', closeModal);

    }
    
  })
  .catch(error => {
    // Gérer les erreurs
    console.error("Error:", error);
  });

     
      
     
      


      //Gestion de la supression de la windows modal
      var modal = document.querySelector('.modal');
      // Fermer la modal en utilisant jQuery
      $(modal).modal('hide');
      // Supprimer la modal du DOM
      modal.remove();


     

      

      
      premiereCellule.cell.setAttribute("get", "false");
      deuxiemeCellule.cell.setAttribute("get", "false");
      changeColorIfGetIsFalse(premiereCellule.cell)
      changeColorIfGetIsFalse(deuxiemeCellule.cell)
      intervalleColorDayMonth(intervalleDaysMonth,deuxiemeCellule.nid,false)

      

    });



    var modalCloseBtn = document.getElementById("modalCloseBtn");

    modalCloseBtn.addEventListener("click", function() {

      premiereCellule.cell.setAttribute("get", "false");
      deuxiemeCellule.cell.setAttribute("get", "false");
      changeColorIfGetIsFalse(premiereCellule.cell)
      changeColorIfGetIsFalse(deuxiemeCellule.cell)
      intervalleColorDayMonth(intervalleDaysMonth,deuxiemeCellule.nid,false)

      var modal = document.querySelector('.modal');
      // Fermer la modal en utilisant jQuery
      $(modal).modal('hide');
      // Supprimer la modal du DOM
      modal.remove();

    });

    var modaleHead = document.getElementById("headClose");

    modaleHead.addEventListener("click", function() {

      premiereCellule.cell.setAttribute("get", "false");
      deuxiemeCellule.cell.setAttribute("get", "false");
      changeColorIfGetIsFalse(premiereCellule.cell)
      changeColorIfGetIsFalse(deuxiemeCellule.cell)

      intervalleColorDayMonth(intervalleDaysMonth,deuxiemeCellule.nid,false)
      var modal = document.querySelector('.modal');
      // Fermer la modal en utilisant jQuery
      $(modal).modal('hide');
      // Supprimer la modal du DOM
      modal.remove();
      

    });

   


    } else {
      // Créez la fenêtre modale d'erreur
      const errorModal = document.createElement("div");
      errorModal.className = "modal";
      errorModal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Erreur de traitement</h4>
              <button type="button" class="close" id="errorClose">&times;</button>
            </div>
            <div class="modal-body">
              <p>Une erreur s'est produite lors du traitement.</p>
              <p>Veuillez réessayer ou contacter l'administrateur.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="errorCloseBtn">Fermer</button>
            </div>
          </div>
        </div>
      `;
    
      // Ajoutez la fenêtre modale d'erreur à la fin du corps du document
      document.body.appendChild(errorModal);
    
      // Affichez la fenêtre modale d'erreur
      $(errorModal).modal('show');
    
      // Ajoutez un écouteur d'événements pour le bouton de fermeture de la fenêtre modale d'erreur
      const errorCloseBtn = document.getElementById('errorCloseBtn');
      const errorClose = document.getElementById('errorClose');
    
      function closeModal() {
        // Supprimez la fenêtre modale d'erreur du DOM après la fermeture
        document.body.removeChild(errorModal);
      }
    
      errorCloseBtn.addEventListener('click', function () {
        // Fermez la fenêtre modale d'erreur lors du clic sur le bouton de fermeture
        $(errorModal).modal('hide');
      });
    
      errorClose.addEventListener('click', function () {
        // Fermez la fenêtre modale d'erreur lors du clic sur le bouton de fermeture dans le coin supérieur droit
        $(errorModal).modal('hide');
      });
    
      // Utilisez l'événement 'hidden.bs.modal' pour détecter quand la fenêtre modale est complètement fermée
      $(errorModal).on('hidden.bs.modal', closeModal);
    

    

      
    
      premiereCellule.cell.setAttribute("get", "false");
      deuxiemeCellule.cell.setAttribute("get", "false");
      changeColorIfGetIsFalse(premiereCellule.cell);
      changeColorIfGetIsFalse(deuxiemeCellule.cell);
    }

    

    

  
  }




  } catch(error) {
    console.log(`Error in editCell function: ${error}`);
  }
}

/**
 * Extrait les jours spécifiés pour un mois donné dans un tableau de jours spécifiques.
 * @param {Array} daySpec - Tableau des jours spécifiques au format "jour-mois".
 * @param {string} moisInput - Mois actuel (au format "mm").
 * @param {Date} year - Objet Date représentant l'année actuelle.
 * @returns {Array} - Tableau des jours spécifiés pour le mois donné.
 */
function DaySpec(daySpec, moisInput, year) {
  var days = [];

  for (var i = 0; i < daySpec.length; i++) {
    // Diviser chaque élément à partir du caractère "-"
    var elementsDivises = daySpec[i].split("-");

    // Vérifier si le mois spécifié correspond au mois actuel
    if (elementsDivises[1] == monthNumber[moisInput.value]) {
      var chiffreSansZero = parseInt(elementsDivises[0], 10);
      days.push(chiffreSansZero);
    }
  }

  return days;
}

/**
 * Réinitialise le calendrier en vidant le tableau des weekends et en effaçant le contenu des éléments HTML correspondant aux jours du mois et aux militaires.
 * @param {Date} year - Objet Date représentant l'année actuelle.
 * @param {Array} daySpec - Tableau des jours spécifiques au format "jour-mois".
 */
function InitCell(year, daySpec) {

  try {
    weekends = [];
    var tr = document.getElementById("days");
    tr.innerHTML = "";

    var tr = document.getElementById("militaire");
    tr.innerHTML = "";

    // Récupération de la valeur du mois sélectionné et mise à jour de l'élément HTML correspondant
    var moisInput = document.getElementById("mois");
    var monthArray = document.getElementById("month");
    monthArray.innerHTML = `${moisInput.value} ${year.getFullYear()}`;

    const days = DaySpec(daySpec, moisInput, year);

    // Création des jours du mois et des cellules correspondantes dans le tableau HTML
    weekends = createDays(daysInMonth, moisInput.value, weekends, year);
    weekends = weekends.concat(days);



    createCell(militaire, moisInput.value, year);
  } catch (error) {
    console.error("Erreur dans la fonction InitCell : ", error);
  }
}

/**
 * Récupère les données du formulaire de modification de cellule.
 * @returns {Array} - Tableau contenant l'intervalle en jours, la date de début et la date de fin.
 */
function FormulaireData() {
  // Récupération des valeurs des champs du formulaire
  var modalStartDateValue = document.getElementById("modalStartDate").value;
  var modalTimeValueStart = document.getElementById("modalTimeStart").value;
  var modalTimeValueEnd = document.getElementById("modalTimeEnd").value;
  var modalEndDateValue = document.getElementById("modalEndDate").value;

  // Initialisation du cumul
  var cumule = 0;

  // Calcul de l'intervalle en jours entre les dates de début et de fin
  var intervalleEnJours = calculerIntervalleEnJours(modalStartDateValue, modalEndDateValue);

  // Affichage de l'intervalle en jours dans la console
  console.log("L'intervalle initial est de : " + intervalleEnJours);

  // Calcul du cumul en fonction des moments de la journée sélectionnés
  if (modalTimeValueStart !== 'journée-complete' && modalTimeValueStart !== "none") {
    cumule += 0.5;
    console.log('Le cumul est de ' + cumule + " pour la date de départ");
  }

  if (modalTimeValueEnd !== 'journée-complete' && modalTimeValueEnd !== "none") {
    cumule += 0.5;
    console.log('Le cumul est de ' + cumule + " pour la date de fin");
  }

  // Gestion des cas spécifiques de cumul
  if (modalTimeValueStart === "matin" && modalTimeValueEnd === "matin") {
    cumule -= 0.5;
  }

  if (modalTimeValueStart === "matin" && modalTimeValueEnd === "apres-midi") {
    cumule -= 1;
  }

  if (modalTimeValueStart === "apres-midi" && modalTimeValueEnd === "apres-midi") {
    cumule -= 0.5;
  }

  // Vérification si l'intervalle en jours est un nombre
  if (isNaN(intervalleEnJours)) {
    console.log('Le cumul est de ' + cumule);
    console.log("Nombre à déduire : jour " + (1 - cumule));

    // Retourne le tableau avec l'intervalle en jours, la date de début et la date de fin
    return [(1 - cumule), modalStartDateValue, modalEndDateValue];
  } else {
    // Calcul de l'intervalle en jours en tenant compte des jours de la semaine
    daysWk = listeDays(modalStartDateValue, modalEndDateValue);
    console.log("L'intervalle entre les deux dates en jours est :", intervalleEnJours + 1 - cumule - countWkDays(daysWk));


    // Retourne le tableau avec l'intervalle en jours, la date de début et la date de fin
    return [intervalleEnJours + 1 - cumule, intervalleEnJours + 1 - cumule - countWkDays(daysWk), modalStartDateValue, modalEndDateValue];
  }
}

/**
 * Calcule l'intervalle en jours entre deux dates.
 * @param {string} date1 - Date de début au format "YYYY-MM-DD".
 * @param {string} date2 - Date de fin au format "YYYY-MM-DD".
 * @returns {number} - Intervalle en jours entre les deux dates.
 */
function calculerIntervalleEnJours(date1, date2) {
  // Convertir les dates en objets Date
  var dateObj1 = new Date(date1);
  var dateObj2 = new Date(date2);

  // Calculer la différence en millisecondes
  var differenceEnMillisecondes = dateObj2 - dateObj1;

  // Convertir la différence en jours
  var differenceEnJours = differenceEnMillisecondes / (1000 * 60 * 60 * 24);

  // Retourner l'intervalle en jours
  return differenceEnJours;
}


/**
 * Récupère une liste des jours entre deux dates.
 *
 * @param {string} date1 - La date de début au format "YYYY-MM-DD".
 * @param {string} date2 - La date de fin au format "YYYY-MM-DD".
 * @returns {Array} Liste des jours entre les deux dates.
 */
function listeDays(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const daysList = [];

  while (startDate <= endDate) {
    const currentDay = startDate.getDate();
    daysList.push(currentDay);
    startDate.setDate(currentDay + 1);
  }

  return daysList;
}

/**
 * Compte le nombre de jours de semaine avec la classe "wk_nb" dans une liste de jours.
 *
 * @param {Array} list - Liste des jours.
 * @returns {number} Nombre de jours avec la classe "wk_nb".
 */
function countWkDays(list) {
  const daysList = list;
  let wkCount = 0;
  let processedDays = {};

  const rows = document.querySelectorAll("#militaire tr");
  rows.forEach(row => {
    daysList.forEach(day => {
      const cells = row.querySelectorAll(`.editable[elt="0"][data-day="${day}"]`);
      cells.forEach(cell => {
        const day = cell.getAttribute("data-day");
        if (day && !processedDays[day]) {
          processedDays[day] = true;
          if (cell.classList.contains("wk_nb")) {
            wkCount++;
          }
        }
      });
    });
  });

  console.log(`Nombre de jours avec la classe "wk_nb" : ${wkCount}`);
  return wkCount;
}

/**
 * Effectue une requête AJAX pour mettre à jour la base de données du calendrier.
 *
 * @param {Object} data - Les données à envoyer dans la requête.
 */
function requestCalendar(data) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "./assets/php/updateDataCalendrier.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  const queryString = Object.entries(data)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');

  xhttp.onload = function() {
    if (xhttp.status === 200) {
      console.log(xhttp.responseText);
    }
  };

  xhttp.onerror = function() {
    console.log("Error: Request failed");
  };
  xhttp.send(queryString);
}

/**
 * Change la classe des cellules spécifiées dans le tableau du calendrier.
 *
 * @param {Array} list - Liste des jours.
 * @param {string} nid - L'identifiant associé à la cellule.
 * @param {string} modalPbValue - La nouvelle classe à appliquer.
 */
function changeStatCell(list, nid, modalPbValue) {
  const daysList = list;

  const rows = document.querySelectorAll("#militaire tr");
  rows.forEach(row => {
    daysList.forEach(day => {
      const cells = row.querySelectorAll(`.editable[nid="${nid}"][data-day="${day}"]`);
      cells.forEach(cell => {
        if (!cell.classList.contains(modalPbValue)) {
          cell.classList.remove(...cell.classList);
          cell.classList.add(modalPbValue);
          cell.classList.add('editable');
          cell.classList.add(cell.getAttribute('nid'));
          cell.classList.add(cell.getAttribute('data-day'));
          cell.textContent = getColorClass(modalPbValue, AllInfoCell);
        }
      });
    });
  });
}

/**
 * Change la couleur de fond d'une cellule si l'attribut "get" est défini à "true".
 *
 * @param {HTMLElement} cell - La cellule à modifier.
 */
function changeColorIfGetIsTrue(cell) {
  if (cell.getAttribute("get") === "true") {
    cell.style.backgroundColor = "#add8e6";
  }
}

/**
 * Change la couleur de fond d'une cellule si l'attribut "get" est défini à "false".
 *
 * @param {HTMLElement} cell - La cellule à modifier.
 */
function changeColorIfGetIsFalse(cell) {
  if (cell.getAttribute("get") === "false") {
    cell.style.backgroundColor = "";
  }
}

/**
 * Change la couleur de fond des cellules en fonction de la valeur de l'événement (true ou false).
 *
 * @param {Array} list - Liste des jours.
 * @param {string} nid - L'identifiant associé à la cellule.
 * @param {boolean} evt - Valeur de l'événement (true ou false).
 */
function intervalleColorDay(list, nid, evt) {
  const daysList = list;

  const rows = document.querySelectorAll("#militaire tr");
  rows.forEach(row => {
    daysList.forEach(day => {
      const cells = row.querySelectorAll(`.editable[nid="${nid}"][data-day="${day}"]`);
      cells.forEach(cell => {
        if (evt === true) {
          cell.setAttribute("get", "true");
          changeColorIfGetIsTrue(cell);
        } else if (evt === false) {
          cell.setAttribute("get", "false");
          changeColorIfGetIsFalse(cell);
        }
      });
    });
  });
}

/**
 * Récupère une liste des jours entre deux dates avec mois.
 *
 * @param {string} date1 - La date de début au format "YYYY-MM-DD".
 * @param {string} date2 - La date de fin au format "YYYY-MM-DD".
 * @returns {Array} Liste des jours avec mois entre les deux dates.
 */
function listeDaysMonth(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const daysList = [];

  while (startDate <= endDate) {
    const currentDay = startDate.getDate();
    const currentMonth = startDate.getMonth() + 1;
    const dayWithMonth = { day: currentDay, month: currentMonth };
    daysList.push(dayWithMonth);
    startDate.setDate(currentDay + 1);
  }

  return daysList;
}

/**
 * Change la couleur de fond des cellules en fonction de la valeur de l'événement (true ou false) avec mois.
 *
 * @param {Array} list - Liste des jours avec mois.
 * @param {string} nid - L'identifiant associé à la cellule.
 * @param {boolean} evt - Valeur de l'événement (true ou false).
 */
function intervalleColorDayMonth(list, nid, evt) {
  const daysList = list;

  const rows = document.querySelectorAll("#militaire tr");
  rows.forEach(row => {
    daysList.forEach(day => {
      const cells = row.querySelectorAll(`.editable[nid="${nid}"][data-day="${day.day}"][month="${day.month}"]`);
      cells.forEach(cell => {
        if (evt === true) {
          cell.setAttribute("get", "true");
          changeColorIfGetIsTrue(cell);
        } else if (evt === false) {
          cell.setAttribute("get", "false");
          changeColorIfGetIsFalse(cell);
        }
      });
    });
  });
}

/**
 * Effectue une requête AJAX pour mettre à jour les informations d'absence dans la base de données.
 *
 * @param {string} date_deb - Date de début de l'absence.
 * @param {string} date_end - Date de fin de l'absence.
 * @param {string} nid - L'identifiant associé à la cellule.
 * @param {string} motif - Motif de l'absence.
 * @param {string} day - Jour de l'absence.
 * @param {string} description - Description de l'absence.
 * @returns {Promise} Promise résolue avec la réponse de la requête ou rejetée avec un message d'erreur.
 */
function requestAbsence(date_deb, date_end, nid, motif, day, description,valideur,day_total) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./assets/php/updateAbsence.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const queryString = `date_deb=${encodeURIComponent(date_deb)}&date_end=${encodeURIComponent(date_end)}&nid=${encodeURIComponent(nid)}&motif=${encodeURIComponent(motif)}&day=${encodeURIComponent(day)}&description=${encodeURIComponent(description)}&valideur=${encodeURIComponent(valideur)}&day_total=${encodeURIComponent(day_total)}`;

    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const responseText = xhttp.responseText;
        console.log(responseText);
        resolve(responseText);
      } else {
        const errorMessage = `HTTP Error ${xhttp.status}: ${xhttp.statusText}`;
        console.error(errorMessage);
        reject(errorMessage);
      }
    };

    xhttp.onerror = function () {
      const errorMessage = "Network Error: Request failed";
      console.error(errorMessage);
      reject(errorMessage);
    };

    xhttp.send(queryString);
  });
}

/**
 * Récupère les valeurs des champs de la modalité et les retourne dans un tableau.
 *
 * @returns {Array} Tableau contenant les valeurs des champs de la modalité.
 */
function getDataForm() {
  var modalStartDateValue = document.getElementById("modalStartDate").value;
  var modalTimeValueStart = document.getElementById("modalTimeStart").value;
  var modalTimeValueEnd = document.getElementById("modalTimeEnd").value;
  var modalEndDateValue = document.getElementById("modalEndDate").value;
  var modalTextValue = document.getElementById("modalText").value;
  var modalGive = document.getElementById("modalGive").value;

  return [modalStartDateValue, modalTimeValueStart, modalTimeValueEnd, modalEndDateValue, modalTextValue,modalGive];
}
