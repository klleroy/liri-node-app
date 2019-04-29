// User types request for song
    // 
// API will return Artist Name, preview link of song & album that song is from.

require('dotenv').config();

const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs = require('fs');
const request = require('request');
const axios = require('axios');

let song = process.argv[3];

console.log(song);


spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   else if (data) {
    
    // console.log(data.tracks.items[0]);
       console.log(data.tracks.items[0].album.artists[0].name);
       console.log(data.tracks.items[0].album.artists[0].external_urls.spotify);
    console.log(data.tracks.items[0].external_urls.spotify);
    }
});
