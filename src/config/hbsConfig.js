const handlebars = require("express-handlebars");

function hbsConfig(app) {
    app.engine("hbs", handlebars({
        extname: "hbs"
    }));
    app.set("views", "./src/views")
    app.set('view engine', 'hbs');
}

module.exports = hbsConfig;