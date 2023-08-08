const UssdMenu = require('ussd-menu-builder');
const _ = require('lodash');

const seeds = require('../ussdfront/dashboard/seeds');
//const settings = require('../ussdfront/dashboard/setting');
const chemical = require('../ussdfront/dashboard/chemical');
const fertilizer = require('../ussdfront/dashboard/fertilizer');
const register = require('../ussdfront/dashboard/register');

const Farmer = require('../models/farmerModel');
const menu = new UssdMenu();

menu.startState({
    run: async () => {        
            const {phoneNumber} = menu.args;
            const farmer = await Farmer.findOne({phone: phoneNumber});
            if(farmer) {
                menu.con(`Welcome back ${farmer.first_name},`+
                "\n1. Seeds"+
                "\n2. Chemical"+
                "\n3. Fertilizer"
                );

            } else {
                menu.con(`Welcome to Jere:`+
                "\n0. Register"+
                "\n1. Seeds"+
                "\n2. Chemical"+
                "\n3. Fertilzer"
                )
            }
        
    },
    next: {
        '0': 'home.register',
        '1': 'home.seed',
        '2': 'home.chemical',
        '3': 'home.fertilizer'
        
    },
    defaultNext: "invalidOption",
})

exports.Menu = [(req, res) => {
    menu.run(req.body, result => {
        res.send(result);
    })
    _.over([seeds, fertilizer, chemical, register])(menu);
}]