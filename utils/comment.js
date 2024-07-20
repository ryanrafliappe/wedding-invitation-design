const fs = require('fs');

const dataPath = './data/comment.json';

const getComments = () => {
    const comments = JSON.parse(fs.readFileSync(dataPath));
    return comments;
}

const saveComment = (name, message) => {
    const comments = getComments();
    
    try {
        comments.unshift({
            name,
            message
        });
    
        fs.writeFileSync(dataPath, JSON.stringify(comments));
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { getComments, saveComment };