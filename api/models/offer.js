const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    homesteadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestead', required: true },
    start: { type: Date , required: true },
    end: { type: Date, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true }
});

module.exports = mongoose.model('Offer', schema);