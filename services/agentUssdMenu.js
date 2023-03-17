const UssdMenu = require('ussd-menu-builder');
const _ = require('lodash');

const agent = require('../ussdfront/dashboard/agent');

const menu = new UssdMenu();

menu.startState({
    run: async => {
        menu.con(`Welcome to Nakore Order verification app:`)
    },
    next: {
        "1":"Collect Cash",
        "2":"Change Pin"
    },
    defaultNext: "invalidOption",
})