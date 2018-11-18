const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const checkAuth2 = require('../middleware/check-auth2');
const HomesteadController = require('../controllers/homesteadsController');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    let dataa = new Date();
    cb(null, dataa.getFullYear() + "-" + dataa.getMonth() + "-" + dataa.getDay()+"-" +file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", HomesteadController.get_all_homesteads);

router.get("/user", checkAuth2, HomesteadController.get_homesteads_by_user_id);

router.post("/user", checkAuth, upload.single('homesteadImage'), HomesteadController.create_homestead);

router.get("/:homesteadId", HomesteadController.get_homestead);

router.patch("/:homesteadId", checkAuth, HomesteadController.update_homestead);

router.delete("/:homesteadId", checkAuth, HomesteadController.delete_homestead);

module.exports = router;
