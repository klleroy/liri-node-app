console.log('this is loaded');

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spotify = void 0;
var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.spotify = spotify;
