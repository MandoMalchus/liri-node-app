require("dotenv").config();
var fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");


var api = process.argv[2];
var query = process.argv[3];

switch (api) {
    case `myTweets`:
        myTweets();

        break;

    case `spotifyThisSong`:
        spotifySearch();
        break;

    case `movieThis`:
        movieThis();
        break;

    case `do-what-it-says`:

        break;


    default:
        break;
}

// var client = new Twitter(keys.twitter);

function myTweets() {

    var client = new twitter(keys.twitter)

    var params = { screen_name: 'MandoMalchus' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < query; i++) {
                console.log(tweets[i].text);
                console.log("=========================================================================================================================================");
            }
        }
    });
}

function spotifySearch() {
    var spotify = new Spotify({
        "id": process.env.SPOTIFY_ID,
        "secret": process.env.SPOTIFY_SECRET
    });
    if (process.argv.length === 3) {

        spotify.search({ type: 'track', query: "mr. nobody" }, function (err, data) {
            console.log("============================");
            console.log("Song's name: " + data.tracks.items[2].name);
            console.log("Album's name: " + data.tracks.items[2].album.name);
            console.log("Artists: " + data.tracks.items[2].artists[0].name);
            console.log("Want to preview this song?" + data.tracks.items[2].preview_url);
            console.log("============================");
        });
    } else {
        spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (let i = 0; i < data.tracks.items.length; i++) {

                console.log("Song's name: " + data.tracks.items[i].name);

                console.log("Album's name: " + data.tracks.items[i].album.name);

                console.log("Artists: " + data.tracks.items[i].artists[0].name);

                console.log("Want to preview this song?: " + data.tracks.items[i].preview_url);
                console.log("============================");
            }
        });
    }
}
function movieThis(){
    var movie ;

        if (process.argv.length === 3) {
        	movie = "Mr. Nobody";
        	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&apikey=trilogy";

        
        	request(queryURL, function (error, response, body) {
        		if (error){
        			console.log("Error: " + error);
        		} else {
        		
        			var weird = JSON.parse(body);

        		
        			var title = weird.Title;
		       		var year = weird.Year;
		        	var rating = weird.imdbRating;
		        	var country = weird.Country;
		        	var actors = weird.Actors;
		        	var rotenRating = weird.Ratings[1].Value;

		       
        			console.log("Movie Title: " + title + 
        				"\nRelease Date: " + year + 
        				"\nIMDB Rating: " + rating + 
        				"\nCountry who made it: " + country +
        				"\nActors: " + actors + 
        				"\nRotten Tomatoes Rating: " + rotenRating +
        				"\nRotten Tomatoes URL: Unknown....");
        		}
			});
        } else {

        
        	movie = process.argv[3];
        	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&apikey=trilogy";

        	request(queryURL, function (error, response, body) {
        		if (error){
        			console.log("Error: " + error);
        		} else {
 
        			var weird = JSON.parse(body);

        			
        			var title = weird.Title;
		       		var year = weird.Year;
		        	var rating = weird.imdbRating;
		        	var country = weird.Country;
		        	var actors = weird.Actors;
		        	var rotenRating = weird.Ratings[1].Value;

		     
        			console.log("Movie Title: " + title + 
        				"\nRelease Date: " + year + 
        				"\nIMDB Rating: " + rating + 
        				"\nCountry who made it: " + country +
        				"\nActors: " + actors + 
        				"\nRotten Tomatoes Rating: " + rotenRating +
        				"\nRotten Tomatoes URL: Not there...");
	        	}
	        })
	    } 
};


 


