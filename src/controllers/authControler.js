const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render("auth/register");
});
router.get('/login', (req, res) => {
    res.render("auth/login");
});
router.post('/register', (req, res) => {
    console.log(req.body);
    res.end();
});

module.exports = router;