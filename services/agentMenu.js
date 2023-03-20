const UssdMenu = require('ussd-menu-builder');
const _ = require('lodash');

const agent =  require("../ussdfront/dashboard/agent");

const Agent = require("../models/agentModel");


const menu = new UssdMenu();
let sessions = {};

menu.startState({
    run: async () => {
        const { val, args: {phoneNumber} } = menu;
       
        const agent = await Agent.findOne({phone: phoneNumber});
        if (agent) {
            menu.con(`Welcome back ${agent.first_name}.`+
            "\n1. Complete Transaction"+
            "\n2. Check Status"+
            "\n3. Pin Setting")
        } else {
            menu.end(`Only partner agent/retailers are allowed`)
        }        
    },
    next: {
        '1':'home.find',
        '2':'home.status',
        '3':'home.settings',
    },
    defaultNext: "invalidOption",

})


exports.Menu = [(req, res) => {
    menu.run(req.body, result => {
        res.send(result);
    })
    _.over([agent])(menu);
}]