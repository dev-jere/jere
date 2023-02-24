const UssdMenu = require('ussd-menu-builder');

const Farmer = require('../models/farmerModel');
const menu = new UssdMenu();

menu.startState({
    run: async () => {        
            const {phoneNumber} = menu.args;
            const farmer = await Farmer.findOne({phone: phoneNumber});
            if(farmer) {
                menu.con(`Welcome back ${farmer.first_name},`+
                "\n1. Seedling"+
                "\n2. Chemicals"+
                "\n3. Fertilizer"
                );

            } else {
                menu.con(`Welcome to Nakore:`+
                "\n1. Register"+
                "\n2. Seedling"+
                "\n3. Chemical"+
                "\n4. Fertilzer"
                )
            }
        
    }
})

exports.Menu = [(req, res) => {
    menu.run(req.body, result => {
        res.send(result);
    })
}]