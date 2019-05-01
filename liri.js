// User types request for song
// 
// API will return Artist Name, preview link of song & album that song is from.

require('dotenv').config();

const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
// not necessary
// const request = require('request');

let action = process.argv[2];
let value = process.argv[3];

switch (action) {
    case 'concert-this':
        concertThis(value);
        break;

    case 'spotify-this-song':
        spotifyThisSong(value);
        break;

    case 'movie-this':
        movieThis(value);
        break;

    case 'do-what-it-says':
        doWhatItSays();
}

// concert search
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(
        function (response) {
            // loop through JSON Array to get concert info.
            for (let i = 0; i < response.data.length; i++) {
                let venue = response.data[i].venue.name;
                logToFile("\nVenue Name: " + venue);
                let country = response.data[i].venue.country;
                logToFile("Country: " + country);
                let city = response.data[i].venue.city;
                logToFile("City: " + city);
                let date = moment(response.data[i].datetime).format('MM/DD/YYYY');
                logToFile("Date: " + date);             
            }
        },
        function (error) {
            if (error.response) {
                logToFile(error.response.data);
                logToFile(error.response.status);
                logToFile(error.response.headers);
            } else if (error.request) {
                logToFile(error.request);
            } else {
                logToFile("Error",error.message);
            }
            logToFile(error.config);            
        }
    )
}

// function to spotify song. Takes value variable from switch case up top.
function spotifyThisSong(value) {
    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return logToFile('Error occurred (Spotify): ' + err);
        }
        else if (data) {
            logToFile("\n-------------------\nspotify-this-song\n" + "-------------------\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + data.tracks.items[0].name + 
                "\nURL: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name
            );
        }
    });
};

// Search OMDB API for movie and returns the following...
/* 
    - Title of the movie
    - Year the movie came out
    - IMDB Rating of the movie
    - Rotten Tomatoes Rating of the movie
    - Country where the movie was produced.
    - Language of the movie.
    - Plot of the movie.
    - Actors in the movie.
*/

// function movieThis(value) {
//     if (value == null) {
//         value = "Mr. Nobody"
//     }
//     // Then run a request with axios to the OMDB API with the movie specified
//     axios.get(
//         "http://omdbapi.com/?t=" + value + "&apikey=trilogy")
//         .then(
//             function (response) {

//             }
//         )
// };

function movieThis(value) {
    if (value === null) {
        value = 'Mr. Nobody'
    }
    // originally concatenated these logs but decided to change for readability.
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + value)
        .then(function (response) {
            let title = response.data.Title;
            logToFile('\nTitle: ' + title);
            let year = response.data.Year;
            logToFile('Year: ' + year);
            let imdbRating = response.data.imdbRating;
            logToFile('IMDB Rating: ' + imdbRating);
            let rottenToms = response.data.Ratings[1].Value;
            logToFile('Rotten Tomatoes Rating: ' + rottenToms);
            let country = response.data.Country;
            logToFile('Country Produced In: ' + country);
            let plot = response.data.Plot;
            logToFile('Plot: ' + plot);
            let actors = response.data.Actors;
            logToFile('Actors: ' + actors);
        }),
        function (error) {
            if (error.response) {
                logToFile(error.response.data);
                logToFile(error.response.status);
                logToFile(error.response.headers);
            } else if (error.request) {
                logToFile(error.request);
            } else {
                logToFile("Error",error.message);
            }
            logToFile(error.config);
        }
}

function doWhatItSays() {
    fs.readFile("random.txt","utf8", function (err, data) {
        if (err) {
            return logToFile(err);
        }
        data = data.split(",");
        if (data[0] === 'concert-this') {
            concertThis(data[1]);
        } else if (data[0] === 'spotify-this-song') {
            spotifyThisSong(data[1]);
        } else if (data[0] === 'movie-this') {
            movieThis(data[1]);
        }
    })
}

function appendToFile(text) {
    fs.appendFile("log.txt", `${text}\n`, function (err) {

        // If an error was experienced we will log it.
        if (err) {
           return logToFile(err);
        }
    });
}

function logToFile(log) {
    appendToFile(log);
    console.log(log);
}
