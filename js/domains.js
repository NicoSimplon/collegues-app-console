"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollegueDTO {
    constructor(nom, prenoms, dateDeNaissance, photoUrl, email) {
        this.nom = nom;
        this.prenoms = prenoms;
        this.dateDeNaissance = dateDeNaissance;
        this.photoUrl = photoUrl;
        this.email = email;
    }
}
exports.CollegueDTO = CollegueDTO;
class Collegue extends CollegueDTO {
    constructor(matricule, nom, prenoms, dateDeNaissance, photoUrl, email) {
        super(nom, prenoms, dateDeNaissance, photoUrl, email);
        this.matricule = matricule;
    }
}
exports.Collegue = Collegue;
