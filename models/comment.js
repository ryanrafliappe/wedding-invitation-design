const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    message: String
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;