const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');

module.exports = menu => {
    menu.state("home.fertilizer", {
        run: async () => {
            const seeds = await Products.find({category: "Fertilizer"});
            let name_list =[];
            let num;
            //let products = seeds["products"];
            for(let i=0; i< seeds.length; i++){
                name_list.push(`\n`+(i+1).toString()+`. ` +seeds[i]["title"]);
                num+= i;
            }
            menu.con(`Fertilizers available:`+
                `${name_list}`
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