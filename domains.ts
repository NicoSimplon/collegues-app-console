export class CollegueDTO {

    roles: string[];

    constructor(public nom:string, public prenoms:string, public dateDeNaissance:string, public photoUrl:string, public email:string, public motDePasse: string) {
        this.roles = ["ROLE_USER"];
    }

}

export class Collegue {

    constructor(public matricule:string, public nom:string, public prenoms:string, public dateDeNaissance:string, public photoUrl:string, public email:string) { }

}

export class Authentification {

    constructor( public email: string, public motDePasse: string){}

}

