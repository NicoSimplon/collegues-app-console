// 01 - let et const

let favoriteCityId = "rome";
console.log(favoriteCityId);

favoriteCityId = "paris";
console.log(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro", "tokyo"];
// cityId = [];
console.log(citiesId);

// 02 - Création d'objet

let getWeather = (citiesId) => {

    let cities = citiesId.map(city => city.toUpperCase());
    let [city] = cities;
    let temperature = 20;

    return { city, temperature };

};

const weather = getWeather(citiesId);
console.log(weather);

// 03 - Affectation destructurée

const {
    city,
    temperature
} = weather;

console.log(city);
console.log(temperature);

const [
    parisId,
    nycId,
    ...othersCitiesId
] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

// 04 - Les classes

class Trip {

    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }
}

const parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
parisTrip.price = 100;
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

// 05 - L'héritage

class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl)
        this.price = 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
console.log(freeTrip.toString());

// 06 - Promise, Set, Map, Arrow Function

class TripService {

    constructor() {
        this.setOfTrip = new Set();
        this.setOfTrip.add(
            new Trip('paris', 'Paris', 'img/paris.jpg'),
            new Trip('nantes', 'Nantes', 'img/nantes.jpg'),
            new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')
        );
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this.setOfTrip.forEach((trip) => {
                    
                    if (trip.name === tripName) {
                        resolve(`Trip found : ${trip.toString()}`);
                    } else {
                        reject(`No trip with name ${tripName}`);
                    } 

                });

            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.priceMap = new Map();
        this.priceMap.set("paris", 100);
        this.priceMap.set("rio-de-janeiro", 800);
        this.priceMap.set("nantes");
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if(this.priceMap.get(tripId)) {
                    resolve(`Price found : ${this.priceMap.get(tripId).toString()}`);
                } else {
                    reject(`No price for trip id ${tripId}`);
                }

            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

tripService.findByName("Paris")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });

priceService.findPriceByTripId("rio-de-janeiro")
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });