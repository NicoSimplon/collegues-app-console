export class CollegueDTO {

    nom:string;
    prenoms:string;
    dateDeNaissance:string;
    photoUrl:string;
    email:string;

    constructor(nom:string, prenoms:string, dateDeNaissance:string, photoUrl:string, email:string) {
        this.nom = nom;
        this.prenoms = prenoms;
        this.dateDeNaissance = dateDeNaissance;
        this.photoUrl = photoUrl;
        this.email = email;
    }

}

export class Collegue extends CollegueDTO {

    matricule:string;

    constructor(matricule:string, nom:string, prenoms:string, dateDeNaissance:string, photoUrl:string, email:string) {
        super(nom, prenoms, dateDeNaissance, photoUrl, email);
        this.matricule = matricule;
    }

}

