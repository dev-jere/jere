

const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');


module.exports = menu => {
    menu.state("home.seed", {
        run: async () => {
            const seeds = await Products.find({category: "Seed"});
            let name_list =[];
            //let products = seeds["products"];
            for(let i=0; i< seeds.length; i++){
                name_list.push((i+1).toString()+seeds[i]["title"]);
            }
            menu.con(`Seed available:`+
                `\n${name_list}`
            );
            },
            next: {
            '0': 'home',
        },
    });
    menu.state('invalidOption', {
        run: () => {
            menu.end(`Invalid option`);
        },
    });
    return menu;
}