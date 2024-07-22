const Comment = require('../models/comment');

// save new comment
const saveComment = async (name, message) => {
    if (name && message) {
        const comment = new Comment({name, message});
        await comment.save();
        return comment;
    }
    return false;
}

const getComments = async () => {
    const comments = await Comment.find();
    return comments;
}

module.exports = { saveComment, getComments };