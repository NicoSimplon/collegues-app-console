import { rejects } from "assert";
import { resolve } from "dns";

class Sejour {
    constructor (private _nom:string, private _prix:number) {

    }

    get nom():string {
        return this._nom;
    }

    get prix():number {
        return this._prix;
    }
}

class SejourService {

    private _sejours:Sejour[] = [];

    constructor() {
        this._sejours.push(new Sejour("Paris", 1000));
        this._sejours.push(new Sejour("Toulouse", 300));
        this._sejours.push(new Sejour("Nantes", 800));
    }

    searchBySejourName(name:string):Promise<Sejour> {

        return new Promise<Sejour> (
            (resolve, reject) => {

                for (let sejour of this._sejours) {
                    if (sejour.nom == name) {
                        resolve(sejour);
                    }
                }
                reject('Aucun séjour trouvé');
  
            }
        );

    }
}

const sejourService = new SejourService();
sejourService.searchBySejourName("Toulouse")
    .then(sejour => console.log(sejour))
    .catch(err => console.log(`${err}`));
