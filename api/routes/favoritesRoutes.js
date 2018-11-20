const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Controller = require('../controllers/favoritesController');

router.get("/", checkAuth, Controller.get_all); // get all by userId ?

router.get("/:favoriteId", Controller.get_by_id); // get by userId ?

router.post("/", checkAuth, Controller.create);

router.patch("/:favoriteId", checkAuth, Controller.update); // validate if userId in favorite

router.delete("/:favoriteId", checkAuth, Controller.delete); // validate if userId in favorite

module.exports = router;
