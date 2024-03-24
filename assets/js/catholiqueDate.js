class EasterCalculator {

    constructor(year) {
        this.year = year;
        console.log("Crèation de l'objet EasterCalculato avec l'année : " + this.year);
    }

    calculateEasterDate(isAscension = false) {

        /*
            Cette fonction calcule la date de Pâques pour une année donnée

            Elle retourne la date de Pâques 
            pour l'année donnée sous forme d'un objet Date

        */

        const a = this.year % 19;
        const b = Math.floor(this.year / 100);
        const c = this.year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const n = Math.floor((h + l - 7 * m + 114) / 31);
        const p = (h + l - 7 * m + 114) % 31;

        console.log("La date de paque est le : " + this.formatDate(new Date(this.year, n - 1, p + 1)));

        return isAscension ? new Date(this.year, n - 1, p + 1) : this.formatDate(new Date(this.year, n - 1, p + 1));
    }

    /*
    
        Cette fonction calcule la date de l'Ascension pour une année donnée

        Elle utilise la fonction 'calculateEasterDate' pour calculer la date de Pâques 
        et ajoute 38 jours pour obtenir la date de l'Ascension
        
        Elle retourne la date de l'Ascension pour l'année donnée sous forme d'un objet Date

    */

    calculateAscensionDate() {

        let easterDate = this.calculateEasterDate(true);
        let ascensionDate = new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 38);

        console.log("La date de l'ascension est le : " + this.formatDate(ascensionDate));
        return this.formatDate(ascensionDate);
    }

    /*  

        Cette fonction calcule la date de la Pentecôte pour une année donnée

        Elle utilise la fonction 'calculateEasterDate' pour calculer 
        la date de Pâques et ajoute 49 jours pour obtenir la date de la Pentecôte

        Elle retourne la date de la Pentecôte pour l'année donnée sous forme d'un objet Date

    */
        

    calculatePentecostDate() {

        let easterDate = this.calculateEasterDate(this.year);
        let pentecostDate = new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 49);

        console.log("La date de la pentecote est le : " + this.formatDate(pentecostDate));
        return this.formatDate(pentecostDate);
    }

    formatDate(date) {
        const options = { day: '2-digit', month: '2-digit' };
        return date.toLocaleDateString('fr-FR', options).replace(/\//g, '-');
    }
}



