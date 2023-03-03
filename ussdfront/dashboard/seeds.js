const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');

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
            "*\\d":"home.faro.pay",
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
            "*\\d":"home.hybrid.pay",
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
            const roundup = JSON.parse(val);         
                menu.con(`How many ${seed[2]} do you want?`);
           
        },
        next: {
            "*\\d":"home.oba.pay",
        },
        defaultNext: "invalidOption",
    });

    //Faro Pay
    menu.state('home.faro.pay', {
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