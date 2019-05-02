# LIRI Node Application

Welcome to the Language Interpretation & Recognition Interface or LIRI for short. This is a command line Node Application allowing you to search for your favorite concert, song on spotify, movie in the Open Movie Database as well as doing whatever you tell it to in an external file. This Application utilizes real language rather than speach recognition. Hence the name, _**Language**_.

## Examples
### Concert Search
- Using the [Band Is In Town API](https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0)
![Screenshot](./assets/images/concertThis.png)

### Spotify
- Using the [Spotify API](https://developer.spotify.com/web-api/)
![Screenshot](./assets/images/spotifyThisSong.png)

### Movie Search
- Using [OMDB API](https://omdbapi.com)
![Screenshot](./assets/images/movieThis.png)

### Do What It Says
- Using the [Spotify API](https://developer.spotify.com/web-api/) we do what is stated in ```random.txt```.
![Screenshot](./assets/images/concertThis.png)

### Video Example
- We are also logging to the console as well as to an external file as shown below.
[Video Example](https://drive.google.com/file/d/1bKHRPvV-t3534G0PAqvLVRhkzPGERxx5/view) of how this works.

## Getting Started

These instructions will get you up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You will need the following installed...

1. ***Node***
    1. Before you can install Node, you’ll need to install two other applications. Fortunately, once you’ve got these on your machine, installing Node takes just a few minutes.<sup>[1]</sup>

        1. XCode. Apple’s XCode development software is used to build Mac and iOS apps, but it also includes the tools you need to compile software for use on your Mac. XCode is free and you can find it in the Apple App Store.
            1. Via Terminal `xcode-select --install`

        1. Homebrew. Homebrew is a package manager for the Mac — it makes installing most open source sofware (like Node) as simple as writing brew install node. To install Homebrew just open Terminal and type ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)". You’ll see messages in the Terminal explaining what you need to do to complete the installation process.

### Deployment Notes
Because this is does not run in the browser, you will need to do some setup on your own to get up and rolling.

1. Fork the project
    1. https://github.com/jobu206/liri-node-app/fork
1. In your local dir, you will want to run `npm init -y` to install all required packages & generate JSON files.
1. Create a `.env` file to hold your API Keys
    1. E.g. `exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};`

## Built With

* [NodeJS](https://nodejs.org/en/) - The JS framework used

## Contributing

1. Fork it (https://github.com/jobu206/GIFtastic/fork)
1. Create your feature branch (git checkout -b feature/GIFtastic)
1. Commit your changes (git commit -am 'Add some yourMessageHere')
1. Push to the branch (git push origin feature/GIFtastic)
1. Create a new Pull Request

## Authors

**Kevin LeRoy** - [Portfolio](https://jobu206.github.io/Official-Portfolio)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

[1] Adapted from instructions found here: https://blog.teamtreehouse.com/install-node-js-npm-mac
