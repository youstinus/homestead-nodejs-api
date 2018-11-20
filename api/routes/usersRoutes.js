const express = require("express");
const router = express.Router();
const UserController = require('../controllers/usersController');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/", checkAuth, UserController.user_delete);

module.exports = router;
