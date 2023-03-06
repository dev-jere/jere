//import Farmer = require('../../models/farmerModel');

module.exports = menu => {
    menu.state("home.register", {
        run: async () => {
            menu.con(`Enter your Firstname:`);             
        },
        next: {
            "*\\w": "home.register.surname",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.surname", {
        run: async () => {
            menu.con(`Enter your Surname:`);             
        },
        next: {
            "*\\w": "home.register.state",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.state", {
        run: async () => {
            menu.con(`Enter your State or residence:`);             
        },
        next: {
            "*\\w": "home.register.lga",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.lga", {
        run: async () => {
            menu.end(`Enter LGA:`);             
        },
        next: {
            "*\\w": "home.register",
        },
        defaultNext: "invalidOption",
    });
    menu.state('invalidOption', {
        run: () => {
            menu.end(`Invalid option`);
        },
    });
    return menu;
}