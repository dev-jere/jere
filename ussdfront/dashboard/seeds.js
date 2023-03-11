const Products = require ('../../models/productModel');
const { v4: uuidv4 } = require('uuid');
const transaction = require('../../models/transaction');
const client = require("twilio")(process.env.accountSid, process.env.authToken);
let sessions = {};
module.exports = menu => {
    menu.state("home.seed", {
        run: async () => {
            const input = await Products.find({category: "Seed"});            
            let seeds="";            
            for(let i=0; i< input.length; i++){
                seeds += (`\n`+[i.toString()]+" : "+ input[i]["title"]); 
            }
            menu.con(`Fertilizers available:`+
                `${seeds}`
            );
            },
            next: {
            '0': 'home.seed.faro',
            '1': 'home.seed.hybrid',
            '2': 'home.seed.oba',
        },
        defaultNext: "invalidOption",
    });

    //Select Faro
    menu.state('home.seed.faro', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i< input.length; i++){
               seed.push(input[i]["title"]);
            }
            const {
                val
            } = menu;
            const roundup = JSON.parse(val);         
                menu.con(`How many ${seed[0]} do you want?`);
           
        },
        next: {
            "*\\d":"home.seed.select.state",
        },
        defaultNext: "invalidOption",
    });

    
    //Select Seed Co Maize Hybrid
    menu.state('home.seed.hybrid', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i< input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val
            } = menu;
            const roundup = JSON.parse(val);         
                menu.con(`How many ${seed[1]} do you want?`);
           
        },
        next: {
            "*\\w":"home.seed.select.state",
        },
        defaultNext: "invalidOption",
    });

    //Select Seed Oba
    menu.state('home.seed.oba', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i< input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val
            } = menu;
            sessions["item"] = seed;
            menu.con(`How many ${seed[2]} do you want?`);
           
        },
        next: {
            "*\\w":"home.seed.select.state",
        },
        defaultNext: "invalidOption",
    });

    //Choose State
    menu.state('home.seed.select.state', {
        run: async () => {
            const {val } = menu;
            sessions["qty"] = val;
            
            menu.con("Please enter State");
           
        },
        next: {
            "*\\w":"home.seed.select.lga"

        },
        defaultNext: "invalideOption",
    });
    //Choose State
    menu.state('home.seed.select.lga', {
        run: async () => {
            const { val } = menu
            sessions["state"] = val
            console.log("Entered value: " + val);
            if (val === "adamawa") {
                menu.con("Please enter your Local Government:");
            } else if (val === "Adamawa"){
                menu.con("Please enter your Local Government:");
            } else if (val === "Lagos"){
                menu.con("Please enter your Local Government:");
            } else if (val === "lagos"){
                menu.con("Please enter your Local Government:");
            }
            else {
                menu.end(`Our service hasn't reached your area yet.
                \nPlease call +2347033009900 to order`)
            }                       
        },
        next: {
            "*\\w":"home.seed.select.lga.summary"
        },
        defaultNext: "invalideOption",
    });

    menu.state('home.seed.select.lga.summary', {
        run: async () => {
            
            const qty = sessions.qty
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i < input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val,
                args: { phoneNumber }
            } = menu;
            sessions["lga"]= val;                
                const total = qty * 3200
                sessions["amount"] = JSON.parse(total);
                menu.con(`Total: ${qty} x 3200 = 
                N${total}. Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
        },
        next: {
            "1": "home.seed.pay",
            "2":"home.chemical.pay"
        },
        defaultNext: "invalidOption",

    })

    //Payment
    menu.state('home.seed.pay',{
        run :async()=> {
            const { val, args:{phoneNumber} } = menu
            const transactionId = uuidv4();
            const qty = sessions.qty
            const amount = qty * 3200;
            const phone = phoneNumber;
            const lga = sessions.lga;
            const state = sessions.state;
            
            try {
                const invoice = new transaction({
                    transactionId, phone, amount, state, lga
                })
                await invoice.save();
                client.messages
                .create({body: `Your order ${transactionId} is ready for pick-up`, from: "+15673390650", to: phoneNumber})
                .then(message => console.log(message.status));
                menu.end(`Order completed`+
            `\n Ref: ${transactionId}`+
            `\n Pickup location to be shared via sms`);
            } catch (err) {
                menu.end("Sorry, transaction failed")
                console.log(err)
            }
            
        }
    })

    //Faro Pay
    menu.state('home.faro.pay', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i < input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val,
                args: { phoneNumber }
            } = menu;
                qty = JSON.parse(val)
                const total = qty * 3200
                menu.con(`Total: ${qty} x 3200 = 
                N${total}. Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
    
        },
        next: {
            "2":"home.chemical.pay"
        },
        defaultNext: "invalidOption",
    });

    //Hybrid Pay
    menu.state('home.hybrid.pay', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i< input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val,
                args: { phoneNumber }
            } = menu;
                qty = JSON.parse(val)
                const total = qty * 3200
                menu.con(`Total: ${qty} x 3200 = 
                N${total}. Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
    
        },
        next: {
            "2":"home.chemical.pay"
        },
        defaultNext: "invalidOption",
    });

    //Oba Pay
    menu.state('home.oba.pay', {
        run: async () => {
            const input = await Products.find({category: "Seed"});
            let seed =[];
            for(let i=0; i< input.length; i++){
                seed.push(input[i]["title"]);
            }
            const {
                val,
                args: { phoneNumber }
            } = menu;
                qty = JSON.parse(val)
                const total = qty * 3200
                menu.con(`Total: ${qty} x 3200 = 
                N${total}. Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
    
        },
        next: {
            "2":"home.chemical.pay"
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