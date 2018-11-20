const express = require("express");
const router = express.Router();
const checkAuth2 = require('../middleware/check-auth2');
const Controller = require('../controllers/reviewsController');

router.get("/", Controller.get_all); // by homestead

router.get("/:id", Controller.get_by_id);

router.post("/", checkAuth2, Controller.create);

router.patch("/:id", checkAuth2, Controller.update);

router.delete("/:id", checkAuth2, Controller.delete);

module.exports = router;
