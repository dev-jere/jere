const UssdMenu = require('ussd-menu-builder');

const Farmer = require('../models/farmerModel');
const menu = new UssdMenu();
const index = () => {
menu.startState('home', {
    run: async () => {        
            const {phoneNumber} = menu.args;
            const farmer = await Farmer.findOne({phone: phoneNumber});
            if(farmer) {
                menu.con(`Welcome back ${farmer.first_name},`+
                "\n1. Seeds"+
                "\n2. Chemicals"+
                "\n3. Fertilizer"+
                "\n4. Change Pin"
                );

            } else {
                menu.con(`Welcome to Nakore:`+
                "\n0. Register"+
                "\n1. Seed"+
                "\n2. Chemicals"+
                "\n3. Fertilizer"                
                )                
            }            
    },
    next: {
        '0': 'home.register',
        '1': 'home.seed',
        '2': 'home.chemical',
        '3': 'home.fertilizer',
        '4': 'home.settings',
    },
    defaultNext: "invalidOption",
    
});

return menu;
}


module.exports = index;