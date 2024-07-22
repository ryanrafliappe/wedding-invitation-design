const Comment = require('../models/comment');

// save new comment
const saveComment = async (name, message) => {
    if (name && message) {
        const comment = new Comment({
            name: sanitize(name), 
            message: sanitize(message)
        });
        await comment.save();
        return comment;
    }
    return false;
}

const getComments = async () => {
    const comments = await Comment.find();
    return comments;
}

function sanitize(string) {
    return string.replace(/<[^>]*>/g, '');
}

module.exports = { saveComment, getComments };