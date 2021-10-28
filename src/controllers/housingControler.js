const router = require('express').Router();
const housingService = require('../services/housingService');
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
    let housings = await housingService.getAll();
    res.render("housing/index", { housings });
});
router.get("/create", isAuth, (req, res) => {
    res.render("housing/create");
});
router.post("/create", isAuth, async (req, res) => {
    try {
        await housingService.create({ ...req.body, owner: req.user._id });
        res.redirect("/housing");
    } catch (err) {
        res.locals.error = getErrorMessage(err);
        res.render("housing/create", req.body);
    }

});
router.get("/:housingId/details", async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user?._id;

    let tenants = housing.getTenants();

    const housingData = await housing.toObject();
    const isAvailable = housing.availablePieces > 0;

    const rented = housing.tenants
        .map(t => t._id)
        .some(x => x._id == req.user?._id);

    res.render("housing/details", { ...housingData, isOwner, tenants, isAvailable, rented });
});



async function isNotOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);
    if (housing.owner == req.user?._id) {
        res.redirect(`/housing/${req.params.housingId}/details`);
    } else {
        next();
    }
}
async function isOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);
    if (housing.owner != req.user?._id) {
        res.redirect(`/housing/${req.params.housingId}/details`);
    } else {
        next();
    }
}



router.get("/:housingId/rent", isNotOwner, async (req, res) => {

    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get("/:housingId/delete", isOwner, async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);
    if (housing.owner == req.user?._id) {
        await housingService.delete(req.params.housingId);
    }

    res.redirect("/housing");
});

router.get("/:housingId/edit", isOwner, async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);
    if (housing.owner != req.user?._id) {
        return res.render("404");
    }

    const housingData = await housing.toObject();
    res.render("housing/edit", { ...housingData })
});

router.post("/:housingId/edit", isOwner, async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);

    if (housing.owner != req.user?._id) {
        return res.render("404");
    }
    await housingService.updateOne(req.params.housingId, req.body);
    res.redirect(`/housing/${req.params.housingId}/details`);
});
function getErrorMessage(error){
    return Object.values(error.errors)[0].message;
}
module.exports = router;