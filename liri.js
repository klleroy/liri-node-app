require('dotenv').config();

const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs = require('fs');
const request = require('request');
const axios = require('axios');

let action = process.argv[2];
let value = process.argv[3];

switch (action) {
    // case 'concert-this':
    //     concertThis(value);
    //     break;

    case 'spotify-this-song':
        spotifyThisSong(value);
        break;
}

function spotifyThisSong(value) {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

// functions called
function spotifyThisSong(value) {
    spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}