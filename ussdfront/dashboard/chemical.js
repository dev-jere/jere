const Products = require ('../../models/productModel');

module.exports = menu => {
    menu.state("home.chemical", {
        run: async () => {
            const seeds = await Products.find({category: "Chemical"});
            let name_list =[];
            //let products = seeds["products"];
            for(let i=0; i< seeds.length; i++){
                name_list.push((i++).toString() + seeds[i]["title"]);
            }
            menu.con(`Chemicals available:`+
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