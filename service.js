var request = require('request');

function rechercherColleguesParNom(nomRecherche, callbackOK, callbackKO) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, (err, res, body) => {

        if (err) {

            callbackKO('Serveur indisponible');

        } else if (res.statusCode >= 400 && res.statusCode <= 499) {

            callbackKO('Erreur dans les informations de la requête');

        } else if (res.statusCode >= 500 && res.statusCode <= 599) {

            callbackKO('Erreur côté serveur');

        } else {

            var tableauMatriculesTrouves = body;

            var trouverCollegue = (tabMats, tabResultats) => {

                if (tabMats.length === 0) {
                    callbackOK([]);
                }

                var matricule = tabMats.pop();

                rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                    tabResultats.push(collegueTrouve);

                    if (tabMats.length > 0) {
                        trouverCollegue(tabMats, tabResultats);
                    } else {
                        callbackOK(tabResultats);
                    }
                });

            }

            trouverCollegue(tableauMatriculesTrouves, []);

        }
    });
}

function rechercherColleguesParMatricule(matricule, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }, (err, res, body) => {

        var colleguesTrouve = body;
        callback(colleguesTrouve);

    });
}

function creerUnCollegue(collegue, callbackOK, callbackKO) {

    request(
        {
            url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
            method: 'POST',
            json: true,
            body: collegue,
        }, 
        (err, res, body) => {

        if (err) {

            callbackKO('Serveur indisponible');
    
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {
    
            callbackKO('Erreur dans les informations de la requête');
    
        } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    
            callbackKO('Erreur côté serveur');
    
        } else {
        
            var collegueCree = body;
            callbackOK(collegueCree);

        }

    });
}

function modifierEmailCollegue(matricule, email, callbackOK, callbackKO) {
    request(
        {
            url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: email,
        }, 
        (err, res, body) => {

        if (err) {

            callbackKO('Serveur indisponible');
    
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {
    
            callbackKO('Erreur dans les informations de la requête');
    
        } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    
            callbackKO('Erreur côté serveur');
    
        } else {
        
            var collegueModifie = body;
            callbackOK(collegueModifie);

        }

    });
}

function modifierPhotoUrlCollegue(matricule, url, callbackOK, callbackKO) {
    request(
        {
            url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: url,
        }, 
        (err, res, body) => {

        if (err) {

            callbackKO('Serveur indisponible');
    
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {
    
            callbackKO('Erreur dans les informations de la requête');
    
        } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    
            callbackKO('Erreur côté serveur');
    
        } else {
        
            var collegueModifie = body;
            callbackOK(collegueModifie);

        }

    });
}

exports.searchByName = rechercherColleguesParNom;
exports.creerCollegue = creerUnCollegue;
exports.modifEmail = modifierEmailCollegue;
exports.modifPhoto = modifierPhotoUrlCollegue;

