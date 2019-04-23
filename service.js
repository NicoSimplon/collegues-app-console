var request = require('request');

function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function (err, res, body) {

        var tableauColleguesTrouves = body;
        tableauCollegues = [];

        tableauColleguesTrouves.forEach(matricule => {
            rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                tableauCollegues.push(collegueTrouve);
                callback(tableauCollegues);
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
    request(`https://nicolas-collegues-api.herokuapp.com/collegues`, { json: true }, function (err, res, body) {

        var collegueCreeRecupere = body;

        callback(collegueCreeRecupere);

    });
}

exports.searchByName = rechercherColleguesParNom;
exports.creerCollegue = creerUnCollegue;

