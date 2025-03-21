const mongoose = require('mongoose');

const smartgearSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, 
    name: { type: String, required: false }, 
}, {
    timestamps: false,
    versionKey: false,
});

module.exports = mongoose.model('Smartgear', smartgearSchema);

