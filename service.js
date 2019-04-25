const request = require('request-promise-native');

class Service {

    rechercherColleguesParNom(nomRecherche) {

        return request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true })
            .then(
                (tableauMatricule) => {
                    let tableauPromises = tableauMatricule.map((matricule) => this.rechercherColleguesParMatricule(matricule));
                    return Promise.all(tableauPromises);
                });
    }

    rechercherColleguesParMatricule(matricule) {

        return request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true });
    }

    creerUnCollegue(collegue) {

        return request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
                method: 'POST',
                json: true,
                body: collegue,
            }
        );
    }

    modifierEmailCollegue(matricule, email) {
        
        return request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: email,
            }
        );
    }

    modifierPhotoUrlCollegue(matricule, url) {
        request(
            {
                url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
                method: 'PATCH',
                json: true,
                body: url,
            }
        );
    }

}

exports.Service = Service;

