var NodeCouchDb = require("node-couchdb")
var nano = require("nano")('http://pi:L$ttleworms.1@192.168.1.45:5984'); 
var BodyParser = require("body-parser");
var Uuid = require("uuid");
var Cors = require("cors");
var Express = require("express");

var imdbAlt = require("./imdbAlt.js");

var parameters = {include_docs: true, descending: true}

var app = Express();

app.use(BodyParser.json());
app.use(Cors());

const dbName = "movies";

const moviesDb = nano.use(dbName);

app.get("/movies", function(req, res) {
    moviesDb.list(parameters, function(err, response, header) {
        if(err) { 
            res.writeHead(500, { "Content-Type": "text/plain" }); 
            res.end("Inserting book failed. " + err + "\n"); 
        } else { 
            res.writeHead(200, { "Content-Type": "text/plain" });

            newJson = "[";
            response.rows.forEach(function(value, index){
                if(newJson == '['){
                    newJson = newJson + JSON.stringify(value.doc);
                } else{
                    newJson = newJson + ',' + JSON.stringify(value.doc);
                }
            });
            newJson = newJson + "]";
            //console.log(newJson);
            res.end(newJson); 
        } 
    });
});

app.get("/movies/:title", function(req, res) {
    //console.log(req.params.title);
    if(!req.params.title) {
        return res.status(400).send({ "message": "Missing `title` parameter" });
    }
    moviesDb.find({selector:{movieTitleLower: {$gte: req.params.title}}}, function(err, response, header) {
        if(err) { 
            res.writeHead(500, { "Content-Type": "text/plain" }); 
            res.end("Inserting book failed. " + err + "\n"); 
        } else { 
            res.writeHead(200, { "Content-Type": "text/plain" }); 
            console.log(JSON.stringify(response.docs));
            res.end(JSON.stringify(response.docs)); 
        } 
    });
});

app.post("/movies", function(req, res) {
    if(!req.body.movieTitle) {
        return res.status(400).send({ "message": "Missing `name` property" });
    }
    req.body.movieTitleLower = req.body.movieTitle.toLowerCase();

    imdbAlt.findTheMovie(req.body.movieTitleLower, function(err, resp) {
        if(err) {
            console.log("L'errore trovato è: " + err);
        } else {
            movieFromTmdb = resp.results;
            req.body.idFromTmdb = movieFromTmdb[0].id;
            req.body.movieTitle = movieFromTmdb[0].title; 
            req.body.originalTitle = movieFromTmdb[0].original_title;
            req.body.overview = movieFromTmdb[0].overview;
            req.body.url2poster = "https://image.tmdb.org/t/p/w500" + movieFromTmdb[0].poster_path;
            //req.body.genres = genres;
            imdbAlt.findTheGenres(movieFromTmdb[0].genre_ids, function(err, resp) {
                if(err) {
                    console.log("L'errore trovato è: " + err);
                } else {
                    req.body.movieGenre = resp;
                    //console.log(req.body);
                }
            });
            imdbAlt.findTheCredits(movieFromTmdb[0].id, function (err, cast, director, screenPlay, story, musicComposer, producers, execProducers){
                if(err) {
                    console.log("L'errore trovato è: " + err);
                } else {
                    req.body.cast = cast;
                    req.body.director = director;
                    req.body.screenPlay = screenPlay;
                    req.body.story = story;
                    req.body.musicComposer = musicComposer;
                    req.body.producers = producers;
                    req.body.execProducers = execProducers;
                    //console.log(req.body);
                    //Lastly, insert all the body into db
                    moviesDb.insert(req.body, function(err, response, header) {
                        if(err) { 
                            res.writeHead(500, { "Content-Type": "text/plain" }); 
                            res.end("Inserting book failed. " + err + "\n"); 
                        } else { 
                            res.writeHead(200, { "Content-Type": "text/plain" }); 
                            res.end(JSON.stringify(response)); 
                        } 
                    });
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log("Starting server on port 3000...");
});