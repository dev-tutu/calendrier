



var dateActuelle = new Date();
dateActuelle.setFullYear(dateActuelle.getFullYear());

/*
    Calcule les jours fériers en france et ajoute les datent dans le 
    tableau holidays
*/

//Crèation de l'objet catholique
let catholiqueDate = new EasterCalculator(dateActuelle.getFullYear());

//Constante des datent catholique féries en France
let easterDate = catholiqueDate.calculateEasterDate();
let ascensionDate = catholiqueDate.calculateAscensionDate();
let pentecostDate = catholiqueDate.calculatePentecostDate();


rtt = RTT(Allrtt,dateActuelle.getFullYear())
// Créer une liste de jours fériés en France sous forme de chaînes de caractères "jj-mm"
holidays = ["01-01","01-05","08-05","14-07","15-08","01-11","11-11","25-12",easterDate,ascensionDate,pentecostDate];
holidays = holidays.concat(rtt);



/*
  Verifie si l'année est Bissextile pour le calcule du nombres jours pour février 
*/

function estBissextile(year) {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
}

// Créer un objet contenant le nombre de jours dans chaque mois de l'année en français
let daysInMonth = {"Janvier" : 31, "Février" : estBissextile( dateActuelle.getFullYear()), "Mars" : 31, "Avril" : 30, "Mai" : 31,
"Juin" : 30, "Juillet" : 31, "Août" : 31, "Septembre" : 30, "Octobre" : 31,"Novembre" : 30,"Décembre" : 31};

// Créer un tableau contenant les noms de chaque mois de l'année en français
var monthInLetters = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// Créer un objet contenant le numéro de chaque mois de l'année en français sous forme de chaînes de caractères "mm"
const monthNumber = {"Janvier" : "01", "Février" : "02", "Mars" : "03", "Avril" : "04", "Mai" : "05",
"Juin" : "06", "Juillet" : "07", "Août" : "08", "Septembre" : "09", "Octobre" : "10", "Novembre" : "11", "Décembre" : "12"};

// Créer un tableau vide pour stocker les jours de weekend qui seront calculés plus tard
var weekends = [];


var moisInput = document.getElementById("mois");
var moisPrecedentBtn = document.getElementById("moisPrecedent");
var moisSuivantBtn = document.getElementById("moisSuivant");

// Initialisation : affichage du mois courant
var moisCourant = dateActuelle.getMonth();


// Attendre que la page soit complètement chargée avant d'exécuter le code
window.addEventListener("load", function() {

  
  afficherMois(moisCourant);

  // Récupération des éléments HTML nécessaires
  var moisInput = document.getElementById("mois");
  var moisPrecedentBtn = document.getElementById("moisPrecedent");
  var moisSuivantBtn = document.getElementById("moisSuivant");
  var monthArray = document.getElementById("month");
  var tr = document.getElementById("nb");

  // Initialisation de la valeur affichée pour le mois courant
  monthArray.innerHTML = `${moisInput.value} ${dateActuelle.getFullYear()}`;

  // Création des cellules pour les jours de la semaine et les jours du mois courant

  weekends = createDays(daysInMonth,moisInput.value,weekends,dateActuelle);


  createCell(militaire,moisInput.value,dateActuelle);



});

//Evenement pour le mois precedent le mois actuel
moisPrecedentBtn.addEventListener("click", function() {

  if(--moisCourant < 0) {

    moisCourant = 11;
    console.log("indice: " + moisCourant);

    dateActuelle.setFullYear(dateActuelle.getFullYear()-1);
    catholiqueDate = new EasterCalculator(dateActuelle.getFullYear());

    //Constante des datent catholique féries en France
    easterDate = catholiqueDate.calculateEasterDate();
    ascensionDate = catholiqueDate.calculateAscensionDate();
    pentecostDate = catholiqueDate.calculatePentecostDate();

    rtt = RTT(Allrtt,dateActuelle.getFullYear())

    // Créer une liste de jours fériés en France sous forme de chaînes de caractères "jj-mm"
    holidays = ["01-01","01-05","08-05","14-07","15-08","01-11","11-11","25-12",easterDate,ascensionDate,pentecostDate];
    holidays = holidays.concat(rtt);

    daysInMonth.Février = estBissextile(dateActuelle.getFullYear());
    weekends = createDays(daysInMonth,moisInput.value,weekends,dateActuelle);

  }

  afficherMois(moisCourant);
  InitCell(dateActuelle,holidays);

});

//Evenement pour le mois suivant le mois actuel
moisSuivantBtn.addEventListener("click", function() {
  
  if(++moisCourant >= 12) {

    moisCourant = 0;

    dateActuelle.setFullYear(dateActuelle.getFullYear()+1);
    catholiqueDate = new EasterCalculator(dateActuelle.getFullYear());

    //Constante des datent catholique féries en France
    easterDate = catholiqueDate.calculateEasterDate();
    ascensionDate = catholiqueDate.calculateAscensionDate();
    pentecostDate = catholiqueDate.calculatePentecostDate();

    rtt = RTT(Allrtt,dateActuelle.getFullYear())

    // Créer une liste de jours fériés en France sous forme de chaînes de caractères "jj-mm"
    holidays = ["01-01","01-05","08-05","14-07","15-08","01-11","11-11","25-12",easterDate,ascensionDate,pentecostDate];
    holidays = holidays.concat(rtt);


    daysInMonth.Février = estBissextile(dateActuelle.getFullYear());
    weekends = createDays(daysInMonth,moisInput.value,weekends,dateActuelle);

  }

  afficherMois(moisCourant);
  InitCell(dateActuelle,holidays);
});


function RTT(Allrtt, year) {
  const rtt = [];

  for (let i = 0; i < Allrtt.length; i++) {
    const dateRTT = Allrtt[i].date_RTT;

    // Convertir la date du format "YYYY-MM-DD" en objet Date
    const dateObj = new Date(dateRTT);

    // Vérifier si l'année de la date est égale à l'année donnée
    if (dateObj.getFullYear() === year) {
      // Ajouter le jour-mois au format "DD-MM" dans le tableau rtt
      const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
      const month = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1);
      const dayMonth = `${day}-${month}`;
      rtt.push(dayMonth);
    }
  }

  return rtt;
}
