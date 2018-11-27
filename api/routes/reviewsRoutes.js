const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Controller = require('../controllers/reviewsController');
const guard = require('express-jwt-permissions')({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });

router.get("/homestead/:homesteadId", Controller.get_all_by_homestead_id); // by homestead

router.get("/:reviewId", Controller.get_by_id);

router.post("/", checkAuth, guard.check('usar'), Controller.create);

router.patch("/:reviewId", checkAuth, guard.check('usar'), Controller.update);

router.delete("/:reviewId", checkAuth, guard.check(['mode'], ['visor']), Controller.delete);

module.exports = router;
