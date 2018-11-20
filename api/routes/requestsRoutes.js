const express = require("express");
const router = express.Router();
const Controller = require('../controllers/requestsController');

router.post("/", Controller.create); // sends email to homestead owner

module.exports = router;
