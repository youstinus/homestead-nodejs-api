const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth'); // owner auth
const Controller = require('../controllers/offersController');

router.get("/", Controller.get_all);

router.get("/:offerId", Controller.get_by_id);

router.post("/", checkAuth, Controller.create); // owner creates offer

router.patch("/:offerId", checkAuth, Controller.update); // owner updates

router.delete("/:offerId", checkAuth, Controller.delete); // owner deletes

module.exports = router;
