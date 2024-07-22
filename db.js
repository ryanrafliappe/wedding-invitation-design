const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;