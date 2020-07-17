const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        trim: true
    }
}, {
    collection: 'list'
});

module.exports = mongoose.model('list', listSchema);