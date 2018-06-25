require("dotenv").config();

// imports dotenv npm package 
var keys = require("./keys.js");
// imports twitter npm package
var Twitter = require("twitter");
// imports node-spotity-api npm package
var Spotify = require("node-spotify-api");
// imports request npm package
var request = require("request");
//give us access spotify keys in hidden file 
var spotify = new Spotify(keys.spotify);
//give us access spotify keys in hidden file 
var client = new Twitter(keys.twitter);

// grabs and stores what the user command is
var userCommand = process.argv[2];
// grabs and stores what the user search value is
var userSearch = process.argv;
// create an empty variable for holding the song name
var songName = "";

// loop through all the words in the user search and add a "+" between multiple arguments
for (var i = 3; i < userSearch.length; i++) {
  if (i > 3 && i < userSearch.length) {
    songName = songName + "+" + userSearch[i];
  }
  else if (i = 3) {
    songName += userSearch[i];
  }
  else if (userSearch[i] = undefined) {
    songName = "The Sign";
  }
}

// this will run a function based off the user argument that was used
switch (userCommand) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    random();
    break;
}

function spotifySong() {
  spotify.search({ type: 'track', query: songName || "My Love" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  // stores the first track object returned
  var trackInfo = data.tracks.items[0];
  
  // displays the artist of the searched track
  console.log("Artist(s): " + (JSON.stringify(trackInfo.album.artists[0].name)));
  
  // displays the name of the searched track
  console.log("Song Name: " + (JSON.stringify(trackInfo.name)));
  
  // displays the preview url of the searched track
  console.log("Preview Song: " + (JSON.stringify(trackInfo.preview_url)));
  
  // displays the album of the searched track
  console.log("Album: " + (JSON.stringify(trackInfo.album.name)));
  });
};
