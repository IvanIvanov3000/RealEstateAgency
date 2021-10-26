const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render("auth/register");
});
router.get('/login', (req, res) => {
    res.render("auth/login");
});
router.post('/register', async (req, res) => {
    const { username, password, name, rePass } = req.body;
    if (password !== rePass) {
        res.locals.error = "Passwords don\'t match!";
        return res.render("auth/register", { username, name });
    } else if (username == "" || password == "" || name == "" || rePass == "") {
        return res.render("auth/register", { username, name });
    }

    let user = await authService.register({ username, password, name, rePass })
    console.log(user);
    res.redirect("/");
});

module.exports = router;