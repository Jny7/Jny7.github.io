const fs = require('fs');
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express()
app.use(cookieParser());

// import database utils
const db = require("./db-utils");

// Set session middleware
app.use(session({
    secret: 'SpriteWord',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, '/../client/static/')))

app.use(express.urlencoded({ extended: false }))

// Authentication validation
app.use((req, res, next) => {
    if(req.url == "/login" || req.url == "/register"){
        if(req.session.islogin) {
            res.redirect("/");
            return;
        }
    } else {
        if(!req.session.islogin){
            res.redirect('/login');
            return;
        }
    }
    next();
});

app.get("", (req, res) => {
    loadHTMLFile('index.html', res);
});

app.get("/login", (req, res) => {
    loadHTMLFile('login.html', res);
});

app.get("/register", (req, res) => {
    loadHTMLFile('register.html', res);
});

app.get("/search", (req, res) => {
    loadHTMLFile('search.html', res);
});

app.get("/personal", (req, res) => {
    loadHTMLFile('personal.html', res);
});

app.post("/login", (req, res) => {
    if (!db.checkUserPassword(req.body.username, req.body.password)) {
        return res.send({"status": "failure"});
    }

    // Save the session
    req.session.user = req.body.username;
    req.session.islogin = true;
    return res.send({"status": "success"});
});

app.post("/register", (req, res) => {
    if(db.checkUserExist(req.body.username)){
        return res.send({"status": "failure", "msg": "username exists"});
    }
    // Add the user
    db.saveUserPassword(req.body.username, req.body.password);
    return res.send({"status": "success"});
});

app.post("/editing", (req, res) => {
    // Save the data
    db.savePersonalInfo(req.session.user, req.body.name, req.body.email, req.body.signature);
    return res.send({"status": "success"});
});

app.get("/logout", (req, res) => {
    req.session.islogin = false;
    return res.redirect("/login");
});

app.get("/info", (req, res) => {
    let info = db.getUserInfo(req.session.user);
    return res.send(info);
});

app.get("/words", (req, res) => {
    return res.send({"status": "success", "words": db.getWords()});
});

app.post("/query", (req, res) => {
    const word = req.body.word;
    const definition = db.getDefinition(word);
    return res.send({"status": "success", "definition": definition});
});

app.get("/savedwords", (req, res) => {
    const words = db.getSavedWords(req.session.user);
    return res.send({"status": "success", "savedwords": words});
});

app.post("/saveword", (req, res) => {
    const word = req.body.word;
    db.saveWord(req.session.user, word);
    return res.send({"status": "success"});
});

// Load the html file from the local machine
function loadHTMLFile(filename, res){
    fs.readFile('../client/' + filename, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Server failed');
        }else{
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(data);
        }
    });
}

app.listen(8080, () => {
    console.log("URL is http://localhost:8080");
});
