const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Controller = require('../controllers/reviewsController');

router.get("/homestead/:homesteadId", Controller.get_all); // by homestead

router.get("/:reviewId", Controller.get_by_id);

router.post("/", checkAuth, Controller.create);

router.patch("/:reviewId", checkAuth, Controller.update);

router.delete("/:reviewId", checkAuth, Controller.delete);

module.exports = router;
