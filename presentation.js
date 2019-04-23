var readline = require('readline');
var service = require('./service.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var start = () => {
    console.log("1. Rechercher un collègue par nom");
    console.log("2. Créer un collègue");
    console.log("3. Modifier l'email");
    console.log("4. Modifier la photo");
    console.log("99. Sortir");

    rl.question('', function (saisie) {

        console.log(`Votre choix : ${saisie}`);

        if (saisie == 1) {
            rl.question('Saisissez le nom à rechercher : ', saisieNom => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.searchByName(saisieNom, (collegue) => {
                    console.log(`${collegue.nom } ${collegue.prenoms } (${collegue.dateDeNaissance})`);
                });
                start();
            });
        } else if (saisie == 99) {
            console.log("Aurevoir");
            rl.close();
        }

    });

}

exports.run = start;

