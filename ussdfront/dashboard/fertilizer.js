const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');

module.exports = menu => {
    menu.state("home.fertilizer", {
        run: async () => {
            const input = await Products.find({category: "Fertilizer"});
            let fertilizer =[];
            let num;
            //let products = seeds["products"];
            for(let i=0; i< input.length; i++){
                fertilizer.push(`\n`+(i+1).toString()+`. ` +input[i]["title"]);
                num+= i;
            }
            menu.con(`Fertilizers available:`+
                `${fertilizer}`
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