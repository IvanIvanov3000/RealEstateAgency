const express = require('express');
const router = express.Router();

const homeRouter = require('./controllers/homeControler');
const authRouter  = require('./controllers/authControler');

router.use(homeRouter);
router.use("/auth", authRouter);

module.exports = router;