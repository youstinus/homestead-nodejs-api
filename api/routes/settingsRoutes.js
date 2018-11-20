const express = require("express");
const router = express.Router();
const Controller = require('../controllers/settingsController');

// how to secure settings. Or do not need if global

router.get("/", Controller.get_all);

router.get("/:settingId", Controller.get_by_id);

router.post("/", Controller.create);

router.patch("/:settingId", Controller.update);

router.delete("/:settingId", Controller.delete);

module.exports = router;
