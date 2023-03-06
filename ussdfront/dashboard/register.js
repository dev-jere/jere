const Farmer = require("../../models/farmerModel");

let sessions = {};

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
            const {
                val
            } = menu;
            sessions["firstname"] = val;
            menu.con(`Enter your Surname:`);             
        },
        next: {
            "*\\w": "home.register.state",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.state", {
        run: async () => {
            const {
                val
            } = menu;
            sessions["surname"] = val;
            menu.con(`Enter your State or residence:`);             
        },
        next: {
            "*\\w": "home.register.lga",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.lga", {
        run: async () => {
            const {
                val
            } = menu;
            sessions["state"] = val;
            menu.con(`Enter LGA:`+
            `\n0. Go Back`);             
        },
        next: {
            "0": "home.register.state",
            "*\\w": "home.register.save",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.save", {
        run: async (req, res) => {
            const {
                val,
                args: { phoneNumber },
            } = menu;
            sessions["lga"] = val;
            const first_name = sessions.firstname;
            const last_name = sessions.surname;
            const state = sessions.state;
            const lga = sessions.lga;
            const phone = phoneNumber;

            try{
                const newFarmer = new Farmer({
                    first_name, last_name, phone, state, lga
                })
                await newFarmer.save()
                menu.end(`Welcome to Nakore`+
            `\n ${first_name}`);
            }catch(err){
                console.log(err);
                menu.end(`Registration failed`);
            }

            console.log(first_name, last_name, state, lga, phoneNumber);
                         
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