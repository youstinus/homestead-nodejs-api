const mongoose = require("mongoose");
const Setting = require("../models/setting");

exports.get_all = (req, res, next) => {
    Setting.find()
    //.select("mainColor mainImage _id")
    .exec()
    .then(results => {
      /*const response = {
        count: results.length,
        items: results.map(doc => {
          return {
            mainColor: doc.mainColor,
            mainImage: doc.mainImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/settings/" + doc._id
            }
          };
        })
      };*/
      res.status(200).json({
        results
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Get all settings fail"
      });
    });
};

exports.get_by_id = (req, res, next) => {
  const id = req.params.settingId;
  Setting.findById(id)
    //.select("mainColor mainImage _id")
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          result
          /*
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/settings/"
          }*/
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(400)
      .json({ 
        error: err,
        message: "Cannot get setting by id"
      });
    });
};

exports.create = (req, res, next) => {
    const setting = new Setting({      
      _id: new mongoose.Types.ObjectId(),
      mainColor: req.body.mainColor,
      mainImage: req.body.mainImage
    });
    setting.save()
      .then(result => {
        res.status(201).json({
          result
          /*
          message: "Created setting successfully",
          created: {
            mainColor: result.mainColor,
            mainImage: result.mainImage,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/settings/" + result._id
            }
          }*/
        });
      })
      .catch(err => {
        res.status(400).json({
          error: err,
          message: "Setting cannot be created"
        });
      });
  };

  // what values to update ?
exports.update = (req, res, next) => {
  const id = req.params.settingId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Setting.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "Setting updated",
        request: {
          type: "PUT",
          url: "http://localhost:3000/settings/" + id
        }
      })*/;
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Setting cannot be updated"
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.settingId;
  Setting.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "setting deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/settings"
        }
      })*/;
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Setting cannot be deleted"
      });
    });
};
