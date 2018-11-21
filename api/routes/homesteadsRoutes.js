const express = require("express");
const router = express.Router();
//const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const HomesteadController = require('../controllers/homesteadsController');
const guard = require('express-jwt-permissions')({
  requestProperty: 'userData',
  permissionsProperty: 'role'
});

router.get("/", checkAuth, guard.check(['usar'], ['sela']), HomesteadController.get_all_homesteads);

router.get("/owner", checkAuth, guard.check('sela'), HomesteadController.get_homesteads_by_user_id); // gets homestead by ownersId ?

router.post("/", checkAuth, guard.check('sela'), HomesteadController.create_homestead); // for owner ?

router.get("/:homesteadId", checkAuth, guard.check(['usar'] ,['sela']), HomesteadController.get_homestead);

router.patch("/:homesteadId", checkAuth, guard.check('sela'), HomesteadController.update_homestead);

router.delete("/:homesteadId", checkAuth, guard.check('sela'), HomesteadController.delete_homestead);


/*const storage = multer.diskStorage({
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
});*/

module.exports = router;
