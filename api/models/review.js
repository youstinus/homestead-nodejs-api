const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    homesteadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestead', required: true },
    name: { type: String, required: true },
    score: { type: Number },
    title: { type: String , required: true },
    details: { type: String, required: true },
    created: { type: Date, required: true }
});

module.exports = mongoose.model('Review', schema);