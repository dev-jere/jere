

const Products = require ('../../models/productModel');
const ProductService = require('../../services/productService');

module.exports = menu => {
    menu.state("home.settings", {
        run: async () => {
            menu.con(`Service under construction`);             
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