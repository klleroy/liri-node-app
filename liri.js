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
            for (let i = 0; i < response.data.length; i++) {
                let venueName = response.data[i].venue.name;
                console.log("\nVenue Name: " + venueName);
                let country = response.data[i].venue.country;
                console.log("Country: " + country);
                let city = response.data[i].venue.city;
                console.log("City: " + city);
                let date = moment(response.data[i].datetime).format('MM/DD/YYYY');
                console.log("Date: " + date);             
            }
        },
        function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error",error.message);
            }
            console.log(error.config);            
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
            return console.log('Error occurred: ' + err);
        }
        else if (data) {
            console.log('\n~~~~~~~~~~~~~~~~~\n');
            console.log('Artist: ' + data.tracks.items[0].album.artists[0].name + '\nSong: ' + data.tracks.items[0].name + 
                '\nURL: ' + data.tracks.items[0].external_urls.spotify + '\nAlbum: ' + data.tracks.items[0].album.name
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

function movieThis(value) {
    if (value == null) {
        value = "Mr. Nobody"
    }
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(
        "http://omdbapi.com/?t=" + value + "&apikey=trilogy")
        .then(
            function (response) {
                console.log(
                    '\n~~~~~~~~~~~~~~~~~\n' + "\nTitle: " + response.data.Title + "\nYear: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes: " + response.data.Ratings[1].Value +
                    "\nCountry Produced In: " + response.data.Country + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors
                );
            }
        )
};

