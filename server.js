var express = require("express");
var path = require("path");
var fs = require("fs");
var dbJson = require("./db/db.json");

var app = express();
var port = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json);
app.use(express.static(__dirname, 'public'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));

});

app.get('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
    });
    res.json(dbJson);
});

app.post('/api/notes', function (req, res) {
    var newPost = req.body;

    function genNewPost(newPost) {
        let id = 1;
        for (let i = o; i < dbJson.length; i++) {
            let Post = dbJson[i];
            if (Post.id > id) {
                id = Post.id
                //  dbJson[i].id = id;
            }
        }
        newPost.id = id + 1;
        dbJson.push(newPost);
        return JSON.stringify(dbJson);
    }
    fs.writeFile('./db/db.json', genNewPost(newPost), function (err) {
        if (err) {
            throw err;
        }
        console.log("Post saved");
    });
    res.json(newPost);
});

app.listen(port, function () {
    console.log(" message received from PORT" + PORT)
});
