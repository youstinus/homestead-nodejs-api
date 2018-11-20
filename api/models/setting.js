const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    
    mainColor: { type: String, required: true },
    mainImage: { type: String, required: true }
});

module.exports = mongoose.model('Setting', schema);