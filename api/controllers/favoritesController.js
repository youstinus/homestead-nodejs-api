const mongoose = require("mongoose");
const Favorite = require("../models/favorite");

exports.get_all = (req, res, next) => {
  Favorite.find()
    .select("userId homesteadId note _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        items: docs.map(doc => {
          return {
            userId: doc.userId,
            homesteadId: doc.homesteadId,
            note: doc.note,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/favorites/" + doc._id
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
  const id = req.params.favoriteId;
  Favorite.findById(id)
    .select("userId homesteadId note _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          item: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/favorites/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

exports.create = (req, res, next) => {
  console.log(req.userData);
    const item = new Favorite({
      _id: new mongoose.Types.ObjectId(),
      userId: req.userData.userId,
      //userId: req.body.userId, // from headers from auth?
      homesteadId: req.body.homesteadId,
      note: req.body.note
    });
    item.save()
      .then(result => {
        res.status(201).json({
          message: "Created favorite successfully",
          created: {
            userId: result.userId, // from headers from auth?
            homesteadId: result.homesteadId,
            note: result.note,
            _id: result._id,
            request: {
              type: "POST",
              url: "http://localhost:3000/favorites/" + result._id
            }
          }
        });
      })
      .catch(err => {
        res.status(400).json({
          error: err
        });
      });
  };

exports.update = (req, res, next) => {
  const id = req.params.favoriteId;
  const updateOps = {};

  if(req.body != null && req.body.note != null){
      updateOps["note"] = req.body.note; // value, propName
  }
  Favorite.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Favorite updated",
        request: {
          type: "PUT",
          url: "http://localhost:3000/favorites/" + id
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.favoriteId;
  Favorite.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Favorite deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:3000/favorites"
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};
