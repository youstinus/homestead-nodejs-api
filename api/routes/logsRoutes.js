const express = require("express");
const router = express.Router();
const Controller = require('../controllers/logsController');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, guard.check(['mode'], ['visor']), Controller.get_all);

router.get("/:logId", checkAuth, guard.check(['mode'], ['visor']), Controller.get_by_id);

router.post("/", Controller.create);

router.delete("/:logId", checkAuth, guard.check(['visor']), Controller.delete);

module.exports = router;
