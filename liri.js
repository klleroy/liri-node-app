// User types request for song
// 
// API will return Artist Name, preview link of song & album that song is from.

require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// not necessary
// const request = require("request");

let action = process.argv[2];
let value = process.argv[3];

switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotifyThisSong(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays();
}

// concert search
// EXAMPLE: node liri.js concert-this Drake
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(
            function (response) {
                // loop through JSON Array to get concert info.
                for (let i = 0; i < response.data.length; i++) {
                    // log output to log.txt & to console.
                    logToFile("\nVenue Name: " + response.data[i].venue.name);
                    logToFile("Country: " + response.data[i].venue.country);
                    logToFile("City: " + response.data[i].venue.city);
                    logToFile("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
                logToFile(error.response.data);
                logToFile(error.response.status);
                logToFile(error.response.headers);
            } else if (error.request) {
                logToFile(error.request)
            } else {
                logToFile("Error", error.message);
            }
            logToFile(error.config);
        }
    )
}

// function to spotify song. Takes value variable from switch case up top.
// EXAMPLE: node liri.js spotify-this-song "Texas Flood"
function spotifyThisSong(value) {
    spotify.search({
        type: "track",
        query: value
    }, function (err, data) {
        if (err) {
            return logToFile("Error occurred (Spotify): " + err);
        }
        else if (data) {
            logToFile("\nArtist: " + data.tracks.items[0].album.artists[0].name)
            logToFile("Song: " + data.tracks.items[0].name)
            logToFile("URL: " + data.tracks.items[0].external_urls.spotify);
            logToFile("Album: " + data.tracks.items[0].album.name);
        }
    });
};

// Search OMDB for Movie using OMDB API
// EXAMPLE: node liri.js movie-this "The Departed"
function movieThis(value) {
    // If Movie Title is not given, Mr. Nobody is used in its place.
    if (!value) {
        value = "Mr. Nobody";
    }
    // originally concatenated these logs but decided to change for readability.
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value)
        .then(function (response) {
            // console.log(response.data);
            logToFile("\nTitle: " + response.data.Title);
            logToFile("Year: " + response.data.Year);
            logToFile("IMDB Rating: " + response.data.imdbRating);
            logToFile("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            logToFile("Country Produced In: " + response.data.Country);
            logToFile("Plot: " + response.data.Plot);
            logToFile("Actors: " + response.data.Actors);
        }),
        function (error) {
            if (error.response) {
                logToFile(error.response.data);
                logToFile(error.response.status);
                logToFile(error.response.headers);
            } else if (error.request) {
                logToFile(error.request);
            } else {
                logToFile("Error", error.message);
            }
            logToFile(error.config);
        }
}

// Do whatever function is listed in random.txt
// EXAMPLE: node liri.js do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return logToFile(err);
        }
        data = data.split(",");
        if (data[0] === "concert-this") {
            concertThis(data[1]);
        } else if (data[0] === "spotify-this-song") {
            spotifyThisSong(data[1]);
        } else if (data[0] === "movie-this") {
            movieThis(data[1]);
        }
    })
}

// Log each output to log.txt
function appendToFile(text) {
    fs.appendFile("log.txt", `${text}\n`, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            return logToFile(err);
        }
    });
}

// Function to log to file
function logToFile(log) {
    appendToFile(log);
    console.log(log);
}