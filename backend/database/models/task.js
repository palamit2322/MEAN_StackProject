const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    collection: 'task'
});

module.exports = mongoose.model('task', taskSchema);