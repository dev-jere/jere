

const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');

module.exports = menu => {
    menu.state("home.fertilizer", {
        run: async () => {
            const seeds = await Products.find({category: "Herbicide"});
            
            if(!seeds) {
                menu.con(`No Seed`);
            } else {
                for(var i = 0; i < seeds.length; i++)
                {
                    var product = seeds[i++];
                    menu.con(`Seed available:`+
                `\n${product.title}`+
                `\n${product.title}`
        
        );
                }
              
        }
        
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