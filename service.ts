import request from 'request-promise-native';
import { CollegueDTO, Authentification } from './domains';

export class Service {

    req = request.defaults({jar: true});

    connexion(auth: Authentification) {

        return this.req({
            url: `https://nicolas-collegues-api.herokuapp.com/auth`,
            method: 'POST',
            json: true,
            body: auth
        });

    }

    deconnexion() {

        return this.req({
            url: `https://nicolas-collegues-api.herokuapp.com/logout`,
            method: 'POST',
            json: true,
            body: null
        });

    }

    rechercherColleguesParNom(nomRecherche:string) {

        return this.req(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true, withCredentials: true })
            .promise()
            .then(
                (tableauMatricule:string[]) => {
                    let tableauPromises = tableauMatricule.map((matricule:string) => this.rechercherColleguesParMatricule(matricule));
                    return Promise.all(tableauPromises);
                });
    }

    rechercherColleguesParMatricule(matricule:string) {

        return this.req(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }).promise();
    }

    creerUnCollegue(collegue:CollegueDTO) {

        return this.req(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
                method: 'POST',
                json: true,
                body: collegue
            }
        ).promise();
    }

    modifierEmailCollegue(matricule:string, email:string) {
        
        return this.req(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: email
            }
        ).promise();
    }

    modifierPhotoUrlCollegue(matricule:string, url:string) {

        return this.req(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: url
            }
        ).promise();
    }

}
