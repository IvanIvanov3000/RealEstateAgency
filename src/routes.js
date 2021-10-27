const express = require('express');
const router = express.Router();

const homeRouter = require('./controllers/homeControler');
const authRouter = require('./controllers/authControler');
const housingRouter = require('./controllers/housingControler');


router.use(homeRouter);
router.use("/auth", authRouter);
router.use("/housing", housingRouter);

module.exports = router;