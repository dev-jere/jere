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
            '0': 'home',
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