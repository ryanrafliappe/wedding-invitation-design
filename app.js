const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// json file. if not using this, comment this initialization
// const { getComments, saveComment } = require('./utils/comment');

// mongodb. if not using this, comment this initialization
const connectDB = require('./db');
const { saveComment, getComments } = require('./utils/comment_db');

const app = express();
const port = 3000;

// set public assest folder
app.use(express.static(path.join(__dirname, 'public')));

// set body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database. comment this if you are not using mongodb.
connectDB();

// set ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const mainData = JSON.parse(fs.readFileSync('./data/main-data.json'));
    const to = req.query.to;

    res.render('index', {
        data: mainData,
        to,
    });
});

// using json file
// app.get('/comments', (req, res) => {
//     const comments = getComments();
//     res.json(comments);
// });

// using mongodb
app.get('/comments', async (req, res) => {
    try {
        const comments = await getComments();
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// using json file
// app.post('/save', (req, res) => {
//     const save = saveComment(req.body.commentName, req.body.commentMessage);
//     res.json({status: save, data: req.body});
// });

// using mongodb
app.post('/save', async (req, res) => {
    try {
        const comment = await saveComment(req.body.commentName, req.body.commentMessage);
        res.status(201).send(comment);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});