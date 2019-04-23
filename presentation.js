var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

var start = () => {
    console.log("1. Rechercher un collègue par nom");
    console.log("99. Sortir");

    rl.question('', function (saisie) {

        // la variable `saisie` contient la saisie effectuée
        var choix = saisie;

        if (choix == 1) {
            console.log(">> Recherche en cours du nom xxx");
            start();
        } else if (choix == 99) {
            console.log("Aurevoir");
            rl.close();
        }

    });

}

exports.run = start;

