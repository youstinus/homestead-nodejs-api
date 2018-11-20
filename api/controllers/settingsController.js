const mongoose = require("mongoose");
const Item = require("../models/setting");

exports.get_all = (req, res, next) => {
    Item.find()
    .select("mainColor mainImage _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
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
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

exports.get_by_id = (req, res, next) => {
  const id = req.params.settingId;
  Item.findById(id)
    .select("mainColor mainImage _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/settings/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(403).json({ error: err });
    });
};

exports.create = (req, res, next) => {
    const item = new Setting({
      _id: new mongoose.Types.ObjectId(),
      mainColor: req.body.mainColor,
      mainImage: req.body.mainImage
    });
    item.save()
      .then(result => {
        res.status(201).json({
          message: "Created setting successfully",
          created: {
            mainColor: result.mainColor,
            mainImage: result.mainImage,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/settings/" + result._id
            }
          }
        });
      })
      .catch(err => {
        res.status(403).json({
          error: err
        });
      });
  };

exports.update = (req, res, next) => {
  const id = req.params.settingId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Item.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Setting updated",
        request: {
          type: "PUT",
          url: "http://localhost:3000/settings/" + id
        }
      });
    })
    .catch(err => {
      res.status(403).json({
        error: err
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.settingId;
  Item.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "setting deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/settings"
        }
      });
    })
    .catch(err => {
      res.status(403).json({
        error: err
      });
    });
};
