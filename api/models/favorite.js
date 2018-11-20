const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    homesteadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestead', required: true },
    note: { type: String }
});

module.exports = mongoose.model('Favorite', schema);