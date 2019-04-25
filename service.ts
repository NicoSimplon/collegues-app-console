import request from 'request-promise-native';
import { Collegue } from './domains';

export class Service {

    rechercherColleguesParNom(nomRecherche:string) {

        return request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true })
            .then(
                (tableauMatricule:any) => {
                    let tableauPromises = tableauMatricule.map((matricule:string) => this.rechercherColleguesParMatricule(matricule));
                    return Promise.all(tableauPromises);
                });
    }

    rechercherColleguesParMatricule(matricule:string) {

        return request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true });
    }

    creerUnCollegue(collegue:Collegue) {

        return request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
                method: 'POST',
                json: true,
                body: collegue,
            }
        );
    }

    modifierEmailCollegue(matricule:string, email:string) {
        
        return request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: email,
            }
        );
    }

    modifierPhotoUrlCollegue(matricule:string, url:string) {

        return request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: url,
            }
        );
    }

}
