var request = require('request');

function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function (err, res, body) {

        var tableauColleguesTrouves = body;

        callback(tableauColleguesTrouves);

    });
}

function rechercherColleguesParMatricule(matricule, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }, function (err, res, body) {

        var colleguesTrouve = body;

        callback(colleguesTrouve);

    });
}

exports.searchByName = rechercherColleguesParNom;
exports.searchByMatricule = rechercherColleguesParMatricule;