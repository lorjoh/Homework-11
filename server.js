var express = require("express");
var path = require("path");
var fs = require("fs");
const dbJson = require("./db/db.json");

let dbFile = path.join(__dirname, './db/db.json');

var app = express();
var port = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(__dirname, 'public'));

// html routes
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// api routes
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
        for (let i = 0; i < dbJson.length; i++) {
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
    fs.writeFile(dbFile, genNewPost(newPost), function (err) {
        if (err) {
            throw err;
        }
        console.log("Post saved");
    });
    res.json(newPost);
});


app.delete('/api/notes/:id', function (req, res) {

    // function deletePost(dbJson) {

    for (let i = 0; i < dbJson.length; i++) {
        if (dbJson[i].id == req.params.id) {
            dbJson.splice(i, 1);
            break;
        }c
    }
    //  return JSON.stringify(dbJson)
    // }

    fs.writeFile(dbFile, JSON.stringify(dbJson), function (err) {
        // fs.writeFile(dbFile, deletePost(dbJson), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Post deleted");
        }
    });
    res.json(db);
});


app.listen(port, function () {
    console.log(" message received from PORT" + port)
});
