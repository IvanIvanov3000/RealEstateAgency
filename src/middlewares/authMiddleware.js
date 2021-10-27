const jwt = require("../utils/jwt");
const { AUTH_COOKIE_NAME, ACCESS_TOKEN_SECRET } = require('../../constants');

exports.auth = async function (req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                return next();
            }).catch(err => {
                console.log(err);
                res.clearCookie(AUTH_COOKIE_NAME);
                res.status(401).render("404");
            });
    } else {
        next();
    }

}

exports.isAuth = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("auth/login");
    }
}