const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: { type: String },
    message: { type: String },
    date: { type: Date }
});

module.exports = mongoose.model('Log', schema);