const mongoose = require("mongoose");
const Homestead = require("../models/homestead");

exports.get_all_homesteads = (req, res, next) => {
  Homestead.find()
    //.select("userId title address latitude longitude homesteadImages details website phoneNumber email priceFrom amenitiesIds accomodationIds sleepCount guestCount buildingCount roomCount _id")
    .exec()
    .then(results => {
      /*const response = {
        results
        ,
        request: {
        type: "GET",
        url: "http://localhost:3000/homesteads/"
            }
      };*/
      res.status(200).json({
        results
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Cannot retrieve all homesteads"
      });
    });
};

exports.get_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  Homestead.findById(id)
    //.select("userId title address latitude longitude homesteadImages details website phoneNumber email priceFrom amenitiesIds accomodationIds sleepCount guestCount buildingCount roomCount _id")
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
              result
              /*,
              request: {
                type: "GET",
                url: "http://localhost:3000/homesteads/" + doc._id
              }*/
            });
          }
          else {
            res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
          }
      })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Cannot get homestead by id"
       });
    });
};

exports.create_homestead = (req, res, next) => {
  const homestead = new Homestead({
    _id: new mongoose.Types.ObjectId(),
    userId: req.userData.userId,
    title: req.body.title,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    homesteadImages: req.body.homesteadImages,
    details: req.body.details,
    website: req.body.website,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    priceFrom: req.body.priceFrom,
    amenitiesIds: req.body.amenitiesIds,
    accomodationIds: req.body.accomodationIds,
    sleepCount: req.body.sleepCount,
    guestCount: req.body.guestCount,
    buildingCount: req.body.buildingCount,
    roomCount: req.body.roomCount   
    
  });
  homestead
    .save()
    .then(result => {
      res.status(201).json({
        result
        
        /*{
          userId: result.userId,
          title: result.title,
          address: result.address,
          latitude: result.latitude,
          longitude: result.longitude,
          homesteadImages: result.homesteadImages,
          details: result.details,
          website: result.website,
          phoneNumber: result.phoneNumber,
          email: result.email,
          priceFrom: result.priceFrom,
          amenitiesIds: result.amenitiesIds,
          accomodationIds: result.accomodationIds,
          sleepCount: result.sleepCount,
          guestCount: result.guestCount,
          buildingCount: result.buildingCount,
          roomCount: result.roomCount,
          _id: result._id
          ,
          request: {
            type: "GET",
            url: "http://localhost:3000/homesteads/" + result._id
          }
        }*/
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(400).json({
        error: err,
        message: "Homestead cannot be created. Check request body"
      });
    });
};

exports.get_homesteads_by_user_id = (req, res, next) => {
  const id = req.userData.userId;
  Homestead.find({userId: id})
    //.select("userId title address latitude longitude homesteadImages details website phoneNumber email priceFrom amenitiesIds accomodationIds sleepCount guestCount buildingCount roomCount _id")
    .exec()
    .then(results => {
        /*const response = {
          results.map(doc => {
            return {
              homestead: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/homesteads/" + doc._id
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
        message: "Cannot get homesteads by owner"
      });
    });
};

exports.update_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  const updateOps = {};
  // validate what fields can you edit later
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Homestead.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "Homestead updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/homesteads/" + id
        }
      })*/;
    })
    .catch(err => {
      //console.log(err);
      res.status(400).json({
        error: err,
        message: "Homestead was not updated"
      });
    });
};

exports.delete_homestead = (req, res, next) => {
  const id = req.params.homesteadId;
  Homestead.remove({ _id: id, userId: req.userData.userId })
    .exec()
    .then(result => {
      res.status(200)/*.json({
        message: "Homestead deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { title: "String", address: "String", details: "String" }
        }
      })*/;
    })
    .catch(err => {
      res.status(400).json({
        error: err,
        message: "Failed to remove homestead. Limited permissions to delete or bad id"
      });
    });
};
