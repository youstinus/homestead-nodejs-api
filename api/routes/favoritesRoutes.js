const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const guard = require("express-jwt-permissions")({
    requestProperty: 'userData',
    permissionsProperty: 'role'
  });
const Controller = require('../controllers/favoritesController');

router.get("/", checkAuth, guard.check(['usar']), Controller.get_all); // get all by userId ?

router.get("/:favoriteId", checkAuth, guard.check(['usar']), Controller.get_by_id); // get by userId ?

router.post("/", checkAuth, guard.check(['usar']), Controller.create);

router.patch("/:favoriteId", checkAuth, guard.check(['usar']), Controller.update); // validate if userId in favorite

router.delete("/:favoriteId", checkAuth, guard.check(['usar']), Controller.delete); // validate if userId in favorite

module.exports = router;
