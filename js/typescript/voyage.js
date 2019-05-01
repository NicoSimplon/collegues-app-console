"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sejour {
    constructor(_nom, _prix) {
        this._nom = _nom;
        this._prix = _prix;
    }
    get nom() {
        return this._nom;
    }
    get prix() {
        return this._prix;
    }
}
class SejourService {
    constructor() {
        this._sejours = [];
        this._sejours.push(new Sejour("Paris", 1000));
        this._sejours.push(new Sejour("Toulouse", 300));
        this._sejours.push(new Sejour("Nantes", 800));
    }
    searchBySejourName(name) {
        return new Promise((resolve, reject) => {
            for (let sejour of this._sejours) {
                if (sejour.nom == name) {
                    resolve(sejour);
                }
            }
            reject('Aucun séjour trouvé');
        });
    }
}
const sejourService = new SejourService();
sejourService.searchBySejourName("Toulouse")
    .then(sejour => console.log(sejour))
    .catch(err => console.log(`${err}`));
