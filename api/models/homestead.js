const mongoose = require('mongoose');

const homesteadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String , required: true },
    address: { type: String, required: true },
    homesteadImage: { type: String, required: false },
    details: { type: String, required: true }
});

module.exports = mongoose.model('Homestead', homesteadSchema);