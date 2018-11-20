const mongoose = require("mongoose");
const Homestead = require("../models/homestead");

exports.get_all_homesteads = (req, res, next) => {
  Homestead.find()
    .select("userId title address latitude longtitude homesteadImages details website amenitiesIds features phoneNumbers emails priceFrom _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            /*title: doc.title,
            address: doc.address,
            homesteadImage: doc.homesteadImage,
            details: doc.details,
            _id: doc._id,*/
            homestead: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/homesteads/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  Homestead.findById(id)
    .select("userId title address latitude longtitude homesteadImages details website amenitiesIds features phoneNumbers emails priceFrom _id")
    .exec()
    .then(doc => {
      //console.log("From database", doc);
      if (doc) {
        res.status(200).json({

              /*title: doc.title,
              address: doc.address,
              homesteadImage: doc.homesteadImage,
              details: doc.details,
              _id: doc._id,*/
              homestead: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/homesteads/" + doc._id
              }
            });
          }
          else {
            res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
          }
      })
    .catch(err => {
      //console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.create_homestead = (req, res, next) => {
  const homestead = new Homestead({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    title: req.body.title,
    address: req.body.address,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    //homesteadImages: [req.file.path],
    homesteadImages: req.body.homesteadImages,
    details: req.body.details,
    website: req.body.website,
    amenitiesIds: req.body.amenitiesIds,
    features: req.body.features,
    phoneNumbers: req.body.phoneNumbers,
    emails: req.body.emails,
    priceFrom: req.body.priceFrom
  });
  homestead
    .save()
    .then(result => {
      //console.log(result);
      res.status(201).json({
        message: "Created homestead successfully",
        createdHomestead: {
          userId: result.userId,
          title: result.title,
          address: result.address,
          latitude: result.latitude,
          longtitude: result.longtitude,
          //homesteadImages: [req.file.path],
          homesteadImages: result.homesteadImages,
          details: result.details,
          website: result.website,
          amenitiesIds: result.amenitiesIds,
          features: result.features,
          phoneNumbers: result.phoneNumbers,
          emails: result.emails,
          priceFrom: result.priceFrom,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/homesteads/" + result._id
          }
        }
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_homesteads_by_user_id = (req, res, next) => {
  const id = req.headers.ident;  
  Homestead.find({user: id})
    .select("user title address homesteadImage details _id")
    .exec()
    .then(docs => {
        const response = {
          count: docs.length,
          homesteads: docs.map(doc => {
            return {
              /*
              title: doc.title,
              address: doc.address,
              homesteadImage: doc.homesteadImage,
              details: doc.details,
              _id: doc._id,*/
              homestead: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/homesteads/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
    .catch(err => {
      //console.log(err);
      res.status(400).json({ error: err });
    });
};

exports.update_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Homestead.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Homestead updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/homesteads/" + id
        }
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  Homestead.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Homestead deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { title: "String", address: "String", details: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
