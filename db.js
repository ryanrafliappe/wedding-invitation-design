const fs = require('fs');
const mongoose = require('mongoose');

const mainData = JSON.parse(fs.readFileSync('./data/main-data.json'));
const uri = mainData.db_uri;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;