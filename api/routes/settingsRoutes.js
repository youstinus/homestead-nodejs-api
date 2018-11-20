const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth3'); // admin
const Controller = require('../controllers/settingsController');

router.get("/", checkAuth, Controller.get_all);

router.get("/:id", checkAuth, Controller.get_by_id);

router.post("/", checkAuth, Controller.create);

router.patch("/:id", checkAuth, Controller.update);

router.delete("/:id", checkAuth, Controller.delete);

module.exports = router;
