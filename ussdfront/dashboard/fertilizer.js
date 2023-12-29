const Products = require ('../../models/productModel');
const Farmer = require ('../../models/nigeria_farmers');
//const ProductService = require('../../services/productService');

module.exports = menu => {
    menu.state("home.fertilizer", {
        run: async () => {
            //List of inventory fertilizer
            const input = await Products.find({category: "Fertilizer"});
            let fertilizer = [];
            let num;
            for(let i = 0; i < input.length; i++){
                fertilizer.push(`\n`+(i).toString()+`. ` +input[i]["title"]);
                num += i;
            }
            menu.con(`Fertilizers available:`+
                `${fertilizer}`                
            );
            
            },
            next: {
                '0':"home.fertilizer.zero",
                '1':"home.fertilizer.first"                
        },
        defaultNext: "invalidOption",
    });

    menu.state('home.fertilizer.zero', {
        run: async () => {
            const { val, args: { phoneNumber } } = menu;
            const input = await Products.find({category: "Fertilizer"});
            

            const farmerDetail = await Farmer.findOne({phone: phoneNumber});
            const farmsize = farmerDetail.farm_size;
            console.log(farmsize);

            //Get Price of selected Fertilizer 
            let fertilizer =[];
            for(let i=0; i< input.length; i++){
                fertilizer.push(input[i]["price"]);
            }
            console.log(fertilizer[0]);
            
            //Calculate total required fertilizer based on Agronomic recomendation of 6bags per acre
            const total = (farmsize * 6) * fertilizer[0]

                menu.con(`Fertilizer for your ${farmsize} acres farm is N${total}. \n Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
        },
            
        next: {
            "*\\d":"home.fertilizer.pay",
        },
        defaultNext: "invalidOption",
    });

    menu.state('home.fertilizer.first', {
        run: async () => {
            const { val, args: { phoneNumber } } = menu;
            const input = await Products.find({category: "Fertilizer"});
            

            const farmerDetail = await Farmer.findOne({phone: phoneNumber});
            const farmsize = farmerDetail.farm_size;
            console.log(farmsize);

            let fertilizer =[];
            for(let i=0; i< input.length; i++){
                fertilizer.push(input[i]["price"]);
            }

            console.log(fertilizer[1]);
            
            //qty = JSON.parse(val)
            const total = (farmsize * 6) * fertilizer[1]

                menu.con(`Fertilizer for your ${farmsize} acres farm is N${total}. \n Proceed to payment?`+
                `\n1. Cash`+
                `\n2. Wallet`+
                `\n3. Airtime`);
           
        },
        next: {
            "*\\d":"home.fertilizer.pay",
        },
        defaultNext: "invalidOption",
    });

    menu.state('home.fertilizer.pay', {
        run: async () => {
            const input = await Products.find({category: "Fertilizer"});

            const farmerDetail = await Farmer.findOne({phone: phoneNumber});
            const farmsize = farmerDetail.farm_size;
            console.log(farmsize);

            let fertilizer =[];
            for(let i=0; i< input.length; i++){
                fertilizer.push(input[i]["title"]);
            }
            const { val, args: { phoneNumber } } = menu;
            qty = JSON.parse(val)
            const total = qty * 11200
                menu.con(`Total: ${qty} x 12,200 = 
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