const express = require("express");
const router = express.Router();
const Controller = require('../controllers/requestsController');
const checkAuth = require('../middleware/check-auth');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });

router.post("/", checkAuth, guard.check('usar'), Controller.create); // sends email to homestead owner

module.exports = router;
