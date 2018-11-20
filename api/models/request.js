const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: { type: String },
    start: { type: Date, required: false },
    end: { type: Date, required: false },
    details: { type: String, required: true }
});

module.exports = mongoose.model('Request', schema);