const express = require("express");
const router = express.Router();
const Controller = require('../controllers/offersController');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });
const checkAuth = require('../middleware/check-auth');

router.get("/", Controller.get_all);

router.get("/:offerId", Controller.get_by_id);

router.post("/", checkAuth, guard.check('sela'), Controller.create); // owner creates offer

router.patch("/:offerId", checkAuth, guard.check('sela'), Controller.update); // owner updates

router.delete("/:offerId", checkAuth, guard.check('sela'), Controller.delete); // owner deletes

module.exports = router;
