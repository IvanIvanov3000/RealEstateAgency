const router = require('express').Router();
const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require("../../constants");
const {isAuth, isGuest}  =require("../middlewares/authMiddleware");

router.get('/register', isGuest, (req, res) => {
    res.render("auth/register");
});
router.get('/login', isGuest, (req, res) => {
    res.render("auth/login");
});
router.post('/register',isGuest, async (req, res) => {
    const { username, password, name, rePass } = req.body;

    if (password !== rePass) {
        res.locals.error = "Passwords don\'t match!";
        return res.render("auth/register", { username, name });
    } else if (username == "" || password == "" || name == "" || rePass == "") {
        return res.render("auth/register", { username, name });
    }
    try {
        await authService.register({ username, password, name, rePass });
        const token = await authService.login({ username, password });
        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect("/");
    } catch (err) {
        throw new Error(err);
    }
});
router.post("/login",isGuest, async (req, res) => {
    try {
        const { username, password } = req.body;


        if (username == "" || password == "") {
            return res.render("auth/login", { username });
        }

        let token = await authService.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect("/");
    } catch (err) {
        throw new Error(err.message);
    }


});
router.get("/logout",isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect("/");
});
module.exports = router;