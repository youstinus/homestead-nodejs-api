const express = require("express");
const router = express.Router();
const Controller = require('../controllers/logsController');

router.get("/", Controller.get_all);

router.get("/:logId", Controller.get_by_id);

router.post("/", Controller.create);

router.delete("/:logId", Controller.delete); // auth admin only ?

module.exports = router;
