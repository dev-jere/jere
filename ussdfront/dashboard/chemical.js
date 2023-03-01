const Products = require ('../../models/productModel');

module.exports = menu => {
    menu.state("home.chemical", {
        run: async () => {
            const input = await Products.find({category: "Herbicide"});
            let herbicide =[];
            let num;
            //let products = seeds["products"];
            for(let i=0; i< input.length; i++){
                herbicide.push(`\n`+(i+1).toString()+`. ` +input[i]["title"]);
                num+= i;
            }
            menu.con(`Chemicals available:`+
                `${herbicide}`
            );
            },
            next: {
            "*\\d":"home.chemical."
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