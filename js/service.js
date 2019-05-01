"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
class Service {
    rechercherColleguesParNom(nomRecherche) {
        return request_promise_native_1.default(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true })
            .then((tableauMatricule) => {
            let tableauPromises = tableauMatricule.map((matricule) => this.rechercherColleguesParMatricule(matricule));
            return Promise.all(tableauPromises);
        });
    }
    rechercherColleguesParMatricule(matricule) {
        return request_promise_native_1.default(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true });
    }
    creerUnCollegue(collegue) {
        return request_promise_native_1.default({
            url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
            method: 'POST',
            json: true,
            body: collegue,
        });
    }
    modifierEmailCollegue(matricule, email) {
        return request_promise_native_1.default({
            url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: email,
        });
    }
    modifierPhotoUrlCollegue(matricule, url) {
        return request_promise_native_1.default({
            url: `https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`,
            method: 'PATCH',
            json: true,
            body: url,
        });
    }
}
exports.Service = Service;
