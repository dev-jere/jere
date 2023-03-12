
module.exports = menu => {
    menu.state("home.settings", {
        run: async () => {
            menu.con(`Service under construction`);             
        },
        next: {
            '0': 'home',
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