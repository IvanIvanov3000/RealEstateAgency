const router = require('express').Router();
const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    const housings = await housingService.getTopHouses();

    res.locals.title = "Home Page";
    res.render("home/index", { housings });
});

router.get("/search",  async(req, res) => {

    const housings = await housingService.search(req.query.text);

    res.locals.title = "Search Page";
    res.render("search", {housings});
})

module.exports = router;