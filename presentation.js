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

            var collegue = {};

            rl.question('Saisissez le nom du nouveau collègue : ', nomSaisi => {
                collegue.nom = nomSaisi;

                rl.question('Saisissez le prénom du nouveau collègue : ', prenomSaisi => {
                    collegue.prenoms = prenomSaisi;

                    rl.question('Saisissez la date de naissance du nouveau collègue (ex: 1988-03-15) : ', dateSaisi => {
                        collegue.dateDeNaissance = dateSaisi;

                        rl.question('Saisissez l\'url de la photo du nouveau collègue (ex: http://img.jpg) : ', urlSaisi => {
                            collegue.photoUrl = urlSaisi;

                            rl.question('Saisissez l\'email du nouveau collègue (ex: mail@mail.com) : ', emailSaisi => {
                                collegue.email = emailSaisi;
                                
                                service.creerCollegue(collegue,
                                    (collegueRecup) => {
                                        console.log("Votre collègue a bien été créé:");
                                        console.log(collegueRecup);
                                        start();
                                    },
                                    (messageErr) => {

                                        console.log('OOps :', messageErr);
                    
                                        start();
                    
                                    }  
                                );

                            });
                        });
                    });
                });
            });

        } else if (saisie == 99) {

            console.log("Aurevoir");
            rl.close();

        }

    });

}

exports.run = start;

