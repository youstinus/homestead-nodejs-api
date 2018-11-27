const express = require("express");
const router = express.Router();
const UserController = require('../controllers/usersController');
const checkAuth = require('../middleware/check-auth');
const validate = require('../validations/userValidation');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });

router.post("/signup", validate.validateRole, UserController.user_signup);

router.post("/login", UserController.user_login);

//router.patch("/", checkAuth, UserController.user_update);

router.delete("/", checkAuth, guard.check(['mode'], ['visor']), UserController.user_delete);

module.exports = router;
