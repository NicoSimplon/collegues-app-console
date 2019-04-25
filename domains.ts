export class Collegue {
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

    toString():string {
        return `${this.nom} ${this.prenoms} (${this.dateDeNaissance}) - ${this.email} / ${this.photoUrl}`;
    }
}