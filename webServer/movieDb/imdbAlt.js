var unirest = require("unirest");
var nano = require("nano")('http://pi:L$ttleworms.1@192.168.1.45:5984'); 

const dbName = "mediagenres";

const genresDb = nano.use(dbName);

var parameters = {include_docs: true, descending: true}
var tmdbKey = "4f5775bb5cc4cd1ef737700d2f9ed436";

exports.findTheMovie = function(movieTitle, callback) {

    var req = unirest("GET", "https://api.themoviedb.org/3/search/movie");
    movieTitlePlus = movieTitle.replace(/ /g,"+");
    console.log(movieTitlePlus);
    req.query({
        "api_key": tmdbKey,
        "query": movieTitlePlus,
        "language": "it"
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
/*         if (res.error) {
            console.log("Errore: " + JSON.stringify(res.error));
        }; */
        //console.log("Body Movie Cavolo!!!: " + JSON.stringify(res.body));
        callback(res.error, res.body);
    });
}

exports.findTheCredits = function(movieId, callback) {

    httpString = "https://api.themoviedb.org/3/movie/" + movieId + "/credits";
    console.log(httpString);
    var req = unirest("GET", httpString);
    req.query({
        "api_key": tmdbKey
    });
    //console.log("la request è: " + JSON.stringify(req));
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        castArray = '[';
        directorArray = "[";
        musicComposerArray = "[";
        storyArray = "[";
        producerArray = "[";
        execProducerArray = "[";
        screenPlayArray = "[";
        //First, retrieve the cast
        Object.keys(res.body.cast).forEach(function(key, index){
            if(res.body.cast[key].order < 20){
                escapedCastName = res.body.cast[key].name.replace(/"/g,'&quot;');
                escapedCastChar = res.body.cast[key].character.replace(/"/g,'&quot;');
                //console.log(escapedCastChar);
                if(castArray == '['){
                    castArray = castArray + '{"name":"' + escapedCastName + '", "character":"' + escapedCastChar + '","profilePhoto":"' + res.body.cast[key].profile_path + '"}';
                } else{
                    castArray = castArray + ',{"name":"' + escapedCastName + '", "character":"' + escapedCastChar + '","profilePhoto":"' + res.body.cast[key].profile_path + '"}';
                }
            } 
        });
        //Then, retrieve selected members from the crew
        Object.keys(res.body.crew).forEach(function (key, index){
            escapedCrewName = res.body.crew[key].name.replace(/"/g,'&quot;');
            if(res.body.crew[key].job == 'Director'){
                if(directorArray == '['){
                    directorArray = directorArray + '{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    directorArray = directorArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            } else if (res.body.crew[key].job == 'Screenplay') {
                if(screenPlayArray == '['){
                    screenPlayArray = screenPlayArray + '{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    screenPlayArray = screenPlayArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            } else if (res.body.crew[key].job == 'Story') {
                if(storyArray == '['){
                    storyArray = storyArray + '{"name":"' + escapedCrewName+ '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    storyArray = storyArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            } else if (res.body.crew[key].job == 'Original Music Composer') {
                if(musicComposerArray == '['){
                    musicComposerArray = musicComposerArray + '{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    musicComposerArray = musicComposerArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            } else if (res.body.crew[key].job == 'Producer') {
                if(producerArray == '['){
                    producerArray = producerArray + '{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    producerArray = producerArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            } else if (res.body.crew[key].job == 'Executive Producer') {
                if(execProducerArray == '['){
                    execProducerArray = execProducerArray + '{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                } else{
                    execProducerArray = execProducerArray + ',{"name":"' + escapedCrewName + '","profilePhoto":"' + res.body.crew[key].profile_path + '"}';
                }
            }
        });
        castArray = castArray + ']';
        directorArray = directorArray + ']';
        screenPlayArray = screenPlayArray + ']';
        storyArray = storyArray + ']';
        musicComposerArray = musicComposerArray + ']';
        producerArray += "]";
        execProducerArray += "]";
        castArrayParsed = JSON.parse(castArray);
        directorArrayParsed = JSON.parse(directorArray);
        screenPlayArrayParsed = JSON.parse(screenPlayArray);
        storyArrayParsed = JSON.parse(storyArray);
        musicComposerArrayParsed = JSON.parse(musicComposerArray);
        producerArrayParsed = JSON.parse(producerArray);
        execProducerArrayParsed = JSON.parse(execProducerArray);
        //console.log(castArray);
        callback(res.error, castArrayParsed, directorArrayParsed, screenPlayArrayParsed, storyArrayParsed, musicComposerArrayParsed, producerArrayParsed, execProducerArrayParsed);
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
            genresArrayParsed = JSON.parse(genresArray);
            callback(err, genresArrayParsed);
            //console.log(genresArray);
            //res.end(JSON.stringify(response.rows));
        } 
    });
 
}
