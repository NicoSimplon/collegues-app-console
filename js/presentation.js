"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const service_1 = require("./service");
const service = new service_1.Service();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const start = () => {
    // Le template de string n'a pas été utilisé afin de garder un code propre
    console.log("1. Rechercher un collègue par nom \n"
        + "2. Créer un collègue \n"
        + "3. Modifier l'email \n"
        + "4. Modifier la photo \n"
        + "99. Sortir \n");
    rl.question('Votre choix : ', (saisie) => {
        if (saisie == '1') {
            rl.question('Saisissez le nom à rechercher : ', saisieNom => {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.rechercherColleguesParNom(saisieNom)
                    .then((tableauCollegue) => {
                    tableauCollegue.forEach((collegue) => {
                        console.log(`${collegue.nom} ${collegue.prenoms} (${collegue.dateDeNaissance}) => matricule: ${collegue.matricule}`);
                    });
                    start();
                })
                    .catch((err) => {
                    console.log(`${err}`);
                    start();
                });
            });
        }
        else if (saisie == '2') {
            let collegue = {};
            rl.question('Saisissez le nom du nouveau collègue : ', (nomSaisi) => {
                collegue.nom = nomSaisi;
                rl.question('Saisissez le prénom du nouveau collègue : ', (prenomSaisi) => {
                    collegue.prenoms = prenomSaisi;
                    rl.question('Saisissez la date de naissance du nouveau collègue (ex: 1988-03-15) : ', (dateSaisi) => {
                        collegue.dateDeNaissance = dateSaisi;
                        rl.question('Saisissez l\'url de la photo du nouveau collègue (ex: http://img.jpg) : ', (urlSaisi) => {
                            collegue.photoUrl = urlSaisi;
                            rl.question('Saisissez l\'email du nouveau collègue (ex: mail@mail.com) : ', (emailSaisi) => {
                                collegue.email = emailSaisi;
                                service.creerUnCollegue(collegue)
                                    .then((collegueRecup) => {
                                    console.log("Votre collègue a bien été créé:");
                                    console.log(collegueRecup);
                                    start();
                                })
                                    .catch((err) => {
                                    console.log(`${err}`);
                                    start();
                                });
                            });
                        });
                    });
                });
            });
        }
        else if (saisie == '3') {
            let matricule = {};
            let email = {};
            rl.question('Saisissez le matricule du collègue à modifier : ', (matriculeSaisi) => {
                matricule.matricule = matriculeSaisi;
                rl.question('Saisissez le nouvel email du collègue : ', (emailSaisi) => {
                    email.email = emailSaisi;
                    service.modifierEmailCollegue(matricule.matricule, email)
                        .then(collegueModifie => {
                        console.log("Votre email a bien été modifié:");
                        console.log(collegueModifie);
                        start();
                    })
                        .catch((err) => {
                        console.log(`${err}`);
                        start();
                    });
                });
            });
        }
        else if (saisie == '4') {
            let matricule = {};
            let url = {};
            rl.question('Saisissez le matricule du collègue à modifier : ', (matriculeSaisi) => {
                matricule.matricule = matriculeSaisi;
                rl.question('Saisissez le nouvel url de la photo du collègue : ', (urlSaisi) => {
                    url.photoUrl = urlSaisi;
                    service.modifierPhotoUrlCollegue(matricule.matricule, url)
                        .then(collegueModifie => {
                        console.log("Votre photo a bien été modifié:");
                        console.log(collegueModifie);
                        start();
                    })
                        .catch((err) => {
                        console.log(`${err}`);
                        start();
                    });
                });
            });
        }
        else if (saisie == '99') {
            console.log("Aurevoir");
            rl.close();
        }
        else {
            console.log("Veuillez rentrer un choix valide !!!");
            start();
        }
    });
};
exports.start = start;
