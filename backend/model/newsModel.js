const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
module.exports = mongoose.model('News', newsSchema);