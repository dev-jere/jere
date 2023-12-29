const Farmer = require("../../models/nigeria_farmers");

let sessions = {};

module.exports = menu => {
    menu.state("home.register", {
        run: async () => {
            
            menu.con(`Enter your NIN:`);             
        },
        next: {
            "*\\w": "home.register.nin",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.nin", {
        run: async () => {
            const {
                val
            } = menu;
            sessions["nin"] = val;
            menu.con(`Enter your Surname:`);             
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
            sessions["surname"] = val;
            menu.con(`Enter your Firstname:`);             
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
            sessions["firstname"] = val;
            menu.con(`Enter State:`);             
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
            menu.con(`Enter Local Govt. Area:`+
            `\n0. Go Back`);             
        },
        next: {
            "0": "home.register.state",
            "*\\w": "home.register.size",
        },
        defaultNext: "invalidOption",
    });
    menu.state("home.register.size", {
        run: async () => {
            const {
                val
            } = menu;
            sessions["lga"] = val;
            menu.con(`Enter farm size (arces):`+
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
            sessions["size"] = val;
            const first_name = sessions.surname;
            const last_name = sessions.firstname;
            const state = sessions.state;
            const lga = sessions.lga;
            const farm_size = sessions.size;
            const phone = phoneNumber;
            const farmer_nin = sessions.nin;

            try{
                const newFarmer = new Farmer({
                    farmer_nin, last_name, first_name, phone, state, lga, farm_size
                })
                await newFarmer.save()
                menu.end(`Registration Successful Welcome to Jere`+
            `\n ${first_name}`);
            }catch(err){
                console.log(err);
                menu.end(`Registration failed`);
            }
            console.log(last_name, first_name, state, lga, phoneNumber, farm_size);
                         
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