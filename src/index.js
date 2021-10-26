const express = require('express');

const { PORT } = require('../constants');
const routes = require('./routes');

const initDatabase = require("./config/databaseConfig");
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');

const app = express();

hbsConfig(app);
expressConfig(app);
app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on  http://localhost:${PORT}...`));
    }).catch(err => {
        console.log("Cannon connect database:", err);
    });

