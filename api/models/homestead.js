const mongoose = require('mongoose');

const homesteadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String , required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longtitude: { type: String, required: true },
    homesteadImages: { type: Array, required: false },    
    details: { type: String, required: true },
    website: { type: String },
    amenitiesIds: { type: Array },
    features: { type: Array },
    phoneNumbers: { type: Array },
    emails: { type: Array },
    priceFrom: { type: Number }
});

module.exports = mongoose.model('Homestead', homesteadSchema);