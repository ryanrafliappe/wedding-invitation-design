const fs = require('fs'); // if using file json
const mongoose = require('mongoose'); // if using mongodb

// using file json
const dataPath = './data/comment.json';

const getComments = () => {
    const comments = JSON.parse(fs.readFileSync(dataPath));
    return comments;
}

const saveComment = (name, message) => {
    const comments = getComments();

    try {
        if (name && message) {
            comments.unshift({
                name,
                message
            });
        
            fs.writeFileSync(dataPath, JSON.stringify(comments));
        }
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { getComments, saveComment };