const UssdMenu = require('ussd-menu-builder');
const _ = require('lodash');

const Agent = require('../../models/agentModel');

const menu = new UssdMenu();

menu.startState({
    run: async () => {
        const { args: {phoneNumber} } = menu;
        const agent = await Agent.findOne({phone: phoneNumber});
        if (agent) {
            menu.con(`Welcome to Nakore Order verification app. 
        \n Please enter Order ID: `
        )
        } else {
            menu.con(`Only partner agent/retailers are allowed`+
            `\n0. Become our agent `)
        }
        
    },
    next: {
        "1":"Find Transaction",
        "2":"Change Pin"
    },
    defaultNext: "invalidOption",
})