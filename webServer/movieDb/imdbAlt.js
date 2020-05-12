var unirest = require("unirest");
var nano = require("nano")('http://pi:L$ttleworms.1@192.168.1.45:5984'); 

var parameters = {include_docs: true, descending: true}

const dbName = "mediagenres";

const genresDb = nano.use(dbName);

exports.findTheMovie = function(movieTitle, callback) {

    var req = unirest("GET", "https://api.themoviedb.org/3/search/movie");
    movieTitlePlus = movieTitle.replace(/ /g,"+");
    console.log(movieTitlePlus);
    req.query({
        "api_key": "4f5775bb5cc4cd1ef737700d2f9ed436",
        "query": movieTitlePlus,
        "language": "it"
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
/*         if (res.error) {
            console.log("Errore: " + JSON.stringify(res.error));
        }; */
        console.log("Body Movie Cavolo!!!: " + JSON.stringify(res.body));
        callback(res.error, res.body);
    });
}

exports.findTheCredits = function(movieId) {

    httpString = "https://api.themoviedb.org/3/movie/" + movieId + "/credits";
    console.log(httpString);
    var req = unirest("GET", httpString);
    req.query({
        "api_key": "4f5775bb5cc4cd1ef737700d2f9ed436"
    });
    //console.log("la request è: " + JSON.stringify(req));
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log("Body Credits: " + JSON.stringify(res.body));
        //return JSON.stringify(res.body);
    });
}

exports.findTheGenres = function(genresIds, callback){
    genresDb.list(parameters, function(err, response, header) {
        if(err) { 
            response.end("Querying the genres failed. " + err + "\n"); 
        } else {
            genresArray = "[";
            //console.log(JSON.stringify(response.rows[0].doc.movieGenres));
             response.rows[0].doc.movieGenres.forEach(function(value, index){
                //console.log(JSON.stringify(value.id));
                genresIds.forEach(function (val, i){
                    if (JSON.stringify(value.id) == val ) {
                        if(genresArray == '['){
                           genresArray = genresArray + JSON.stringify(value.name);
                        } else{
                           genresArray = genresArray + ',' + JSON.stringify(value.name);
                        }
                    }
                });
            });
            genresArray = genresArray + "]";
            callback(err, genresArray);
            //console.log(genresArray);
            //res.end(JSON.stringify(response.rows));
        } 
    });
 
}
