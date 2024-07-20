const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { getComments, saveComment } = require('./utils/comment');

const app = express();
const port = 3000;

// set public assest folder
app.use(express.static(path.join(__dirname, 'public')));

// set body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/comments', (req, res) => {
    const comments = getComments();
    res.json(comments);
})

app.post('/save', (req, res) => {
    const save = saveComment(req.body.commentName, req.body.commentMessage);
    res.json({status: save, data: req.body});
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});