const mongoose = require('mongoose');

const homesteadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String , required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    homesteadImages: { type: Array, required: false },    
    details: { type: String, required: true },
    website: { type: String },
    phoneNumber: { type: String },
    email: { type: String }, //, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    priceFrom: { type: Number },
    amenitiesIds: { type: Array },
    accomodationIds: { type: Array },
    sleepCount: { type: Number },
    guestCount: { type: Number },
    buildingCount: { type: Number },
    roomCount: { type: Number }
});

module.exports = mongoose.model('Homestead', homesteadSchema);