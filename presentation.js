var readline = require('readline');
var service = require('./service.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var start = () => {
    console.log(
        "1. Rechercher un collègue par nom \n"
        + "2. Créer un collègue \n"
        + "3. Modifier l'email \n"
        + "4. Modifier la photo \n"
        + "99. Sortir \n"
    );

    rl.question('Votre choix : ', function (saisie) {

        if (saisie == 1) {
            rl.question('Saisissez le nom à rechercher : ', saisieNom => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.searchByName(saisieNom, (tableauCollegue) => {

                    tableauCollegue.forEach(collegue => {
                        console.log(`${collegue.nom} ${collegue.prenoms} (${collegue.dateDeNaissance})`);
                    });

                    start();

                }, (messageErr) => {

                    console.log('OOps :', messageErr);

                    start();

                });

            });

        } else if (saisie == 2) {

            var collegue = {
                nom: "Marty",
                prenoms: "Grégory",
                dateDeNaissance: "1987-12-09",
                photoUrl: "http://img.jpg",
                email: "mail@mail.com"
            }

            rl.question('Voulez-vous créer un nouveau collègue ? ', saisiReponse => {
                console.log(`${saisiReponse}`);
                service.creerCollegue(collegue);
                start();
            });

        } else if (saisie == 99) {

            console.log("Aurevoir");
            rl.close();
            
        }

    });

}

exports.run = start;

