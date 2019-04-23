var request = require('request');

function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function (err, res, body) {

        var tableauColleguesTrouves = body;
        
        tableauColleguesTrouves.forEach(matricule => {
            rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                callback(collegueTrouve);
            });
        });

    });
}

function rechercherColleguesParMatricule(matricule, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }, function (err, res, body) {

        var colleguesTrouve = body;
        callback(colleguesTrouve);

    });
}

function creerUnCollegue(collegue, callback) {
    request({
        uri: `https://nicolas-collegues-api.herokuapp.com/collegues`,
        method: 'POST',
        headers: [
            {
              name: 'content-type',
              value: 'json'
            }
        ],
    });
}

exports.searchByName = rechercherColleguesParNom;
exports.creerCollegue = creerUnCollegue;

