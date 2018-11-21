const express = require("express");
const router = express.Router();
const Controller = require('../controllers/settingsController');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });
// how to secure settings. Or do not need if global

router.get("/", Controller.get_all);

router.get("/:settingId", Controller.get_by_id);

router.post("/", guard.check('visor'), Controller.create);

router.patch("/:settingId", guard.check('visor'), Controller.update);

router.delete("/:settingId", guard.check('visor'), Controller.delete);

module.exports = router;
