const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth3'); // owner auth
const Controller = require('../controllers/offersController');

router.get("/", Controller.get_all);

router.get("/:id", Controller.get_by_id);

router.post("/", checkAuth, Controller.create);

router.patch("/:id", checkAuth, Controller.update);

router.delete("/:id", checkAuth, Controller.delete);

module.exports = router;
