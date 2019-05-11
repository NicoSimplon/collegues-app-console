import * as readline from 'readline';
import { Service } from './service';
import { Collegue, CollegueDTO, Authentification } from './domains';

const service: Service = new Service();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const start = (): void => {

    let authentification: any = {};

    console.log("** Se Connecter **");

    rl.question('Votre email : ', (saisieEmail: string) => {
        authentification.email = saisieEmail;

        rl.question('Votre mot de passe : ', (saisiePassword: string) => {
            authentification.motDePasse = saisiePassword;

            service.connexion(new Authentification(authentification.email, authentification.motDePasse))
                .then(
                    (user) => {
                        console.log(`Vous êtes connecté : ${user.nom} ${user.prenoms}`);
                        menu();
                    }
                ).catch((err: Error) => {
                    console.log(`${err}`);
                    start();
                });

        });

    });

}

const menu = () => {
    console.log(`
** Administration Collegues **
1. Rechercher un collègue par nom
2. Créer un collègue
3. Modifier l'email
4. Modifier la photo
99. Sortir
    `);

    rl.question('Votre choix : ', (saisie: string) => {

        if (saisie == '1') {

            rl.question('Saisissez le nom à rechercher : ', (saisieNom: string): void => {

                console.log(`>> Recherche en cours du nom ${saisieNom}`);

                service.rechercherColleguesParNom(saisieNom)
                    .then((tableauCollegue: Collegue[]) => {
                        tableauCollegue.forEach((collegue: Collegue): void => {
                            console.log(`${collegue.nom} ${collegue.prenoms} (${collegue.dateDeNaissance}) => matricule: ${collegue.matricule}`);
                        });
                        menu();
                    })
                    .catch((err: Error) => {
                        console.log(`${err}`);
                        menu();
                    });
            });

        } else if (saisie == '2') {

            let collegue: CollegueDTO = new CollegueDTO("", "", "", "", "", "");

            rl.question('Saisissez le nom du nouveau collègue : ', (nomSaisi: string): void => {
                collegue.nom = nomSaisi;

                rl.question('Saisissez le prénom du nouveau collègue : ', (prenomSaisi: string): void => {
                    collegue.prenoms = prenomSaisi;

                    rl.question('Saisissez la date de naissance du nouveau collègue (ex: 1988-03-15) : ', (dateSaisi: string): void => {
                        collegue.dateDeNaissance = dateSaisi;

                        rl.question('Saisissez l\'url de la photo du nouveau collègue (ex: http://img.jpg) : ', (urlSaisi: string): void => {
                            collegue.photoUrl = urlSaisi;

                            rl.question('Saisissez l\'email du nouveau collègue (ex: mail@mail.com) : ', (emailSaisi: string): void => {
                                collegue.email = emailSaisi;

                                rl.question('Saisissez le mot de passe du nouveau collègue : ', (password: string): void => {
                                    collegue.motDePasse = password;

                                    service.creerUnCollegue(collegue)
                                        .then(
                                            (collegueRecup: Collegue): void => {
                                                console.log("Votre collègue a bien été créé:");
                                                console.log(collegueRecup);
                                                menu();
                                            })
                                        .catch((err: Error) => {
                                            console.log(`${err}`);
                                            menu();
                                        });
                                });
                            });
                        });
                    });
                });
            });

        } else if (saisie == '3') {

            let matricule: any = {};
            let email: any = {};

            rl.question('Saisissez le matricule du collègue à modifier : ', (matriculeSaisi: string): void => {
                matricule.matricule = matriculeSaisi;

                rl.question('Saisissez le nouvel email du collègue : ', (emailSaisi: string): void => {
                    email.email = emailSaisi;

                    service.modifierEmailCollegue(matricule.matricule, email)
                        .then((collegueModifie: Collegue): void => {
                            console.log("Votre email a bien été modifié:");
                            console.log(collegueModifie);
                            menu();
                        })
                        .catch((err: Error) => {
                            console.log(`${err}`);
                            menu();
                        });

                });

            });

        } else if (saisie == '4') {

            let matricule: any = {};
            let url: any = {};

            rl.question('Saisissez le matricule du collègue à modifier : ', (matriculeSaisi: string): void => {
                matricule.matricule = matriculeSaisi;

                rl.question('Saisissez le nouvel url de la photo du collègue : ', (urlSaisi: string): void => {
                    url.photoUrl = urlSaisi;

                    service.modifierPhotoUrlCollegue(matricule.matricule, url)
                        .then((collegueModifie: Collegue): void => {
                            console.log("Votre photo a bien été modifié:");
                            console.log(collegueModifie);
                            menu();
                        })
                        .catch((err: Error) => {
                            console.log(`${err}`);
                            menu();
                        });

                });

            });

        } else if (saisie == '99') {

            console.log("Aurevoir");
            rl.close();
            service.deconnexion()
                .then(
                    () => {},
                    errors => console.log(errors)
                )

        } else {

            console.log("Veuillez rentrer un choix valide !!!");
            menu();

        }

    });

}

export { start };

