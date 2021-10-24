const express = require('express');


const  hbsConfig  = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');

const app = express();
const {PORT} = require('../constants');

hbsConfig(app);
expressConfig(app);

app.get('/', (req, res) => {
    res.render("home/index");
});


app.listen(PORT, () => console.log(`Listening on  http://localhost:${PORT}...`));