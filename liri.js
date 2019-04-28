require('dotenv').config();

import { spotify as _spotify } from './keys.js';
import Spotify from 'node-spotify-api';
spotify = new Spotify(_spotify);
import moment from 'moment';
import fs from 'fs';
import request from 'request';
import axios from 'axios';

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

// functions called
function spotifyThisSong(value) {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
}