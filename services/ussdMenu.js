const UssdMenu = require('ussd-menu-builder');
const _ = require('lodash');

const seeds = require('../ussdfront/dashboard/seeds');
const fertilizer = require('../ussdfront/dashboard/fertilizer');

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
                "\n0. Register"+
                "\n1. Seedling"+
                "\n2. Chemical"+
                "\n3. Fertilzer"
                )
            }
        
    },
    next: {
        '0': 'home.register',
        '1': 'home.seed',
        '2': 'home.chemical',
        '3': 'home.fertilizer',
        '4': 'home.pin',
    },
    defaultNext: "invalidOption",
})

exports.Menu = [(req, res) => {
    menu.run(req.body, result => {
        res.send(result);
    })
    _.over([seeds,fertilizer])(menu);
}]