const UssdMenu = require('ussd-menu-builder');
const Order = require('../../models/transaction');

let sessions = {};

module.exports = menu => {
menu.state('home.find', {
    run: async () => {
        const { val } =menu;
        sessions["ref"] = val;
        menu.con(`Provide Ref Code: `);
    },
    next: {
        "*\\w":"home.find.validate"
    },
    defaultNext: "invalidOption",
})

menu.state("home.find.validate", {
    run: async () => {
        const { val } = menu;
        const id = sessions.ref;
        console.log("val:", val);
        console.log(id);
        const data = await Order.findOne({transactionId: val});
        if(data){
            console.log(data);
            menu.con("progress with num");
        } else {
            menu.end("Invalid refcode");
        }
    },
    next: {
        "1":"home.find.validate",
        "2":"Change Pin"
    },
    defaultNext: "invalidOption",
})

menu.state('invalidOption', {
    run: () => {
        menu.end(`Invalid option`);
    },
});
return menu;
}