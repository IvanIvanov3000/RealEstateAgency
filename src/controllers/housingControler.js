const router = require('express').Router();
const housingService = require('../services/housingService');

router.get("/", (req, res) => {
    res.render("housing/index");
});
router.get("/create", (req, res) => {
    res.render("housing/create");
});
router.post("/create", async (req, res) => {
    console.log(req.body);
    await housingService.create(req.body);
    res.redirect("/housing");
})
module.exports = router;