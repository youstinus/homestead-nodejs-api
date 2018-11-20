const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    
    mainColor: { type: String, required: false },
    mainImage: { type: String, required: false }
});

module.exports = mongoose.model('Setting', schema);