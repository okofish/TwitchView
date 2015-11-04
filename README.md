# TwitchView

TwitchView is Apple TV client for live streams on [Twitch.tv](http://twitch.tv).

![](https://raw.githubusercontent.com/okofish/TwitchView/gh-pages/images/icon.png)

## Instructions
Build and run the project in the xcode folder on your Apple TV. It's as easy as that!

If you want to modify the TVJS or TVML, you'll have to host the client folder locally or on the internet. Make sure to change the URL in AppDelegate.swift.

## TODO
If you can help with any of these, please feel free to submit a pull request.

- Add routines to check that entered channels are valid and live before attempting to play the stream
- Add error handlers with alert boxes
- Consider using localStorage to store last entered channel
- Make a gallery of live channels to choose from on start

## Screenshots

![](https://raw.githubusercontent.com/okofish/TwitchView/gh-pages/images/screenshot1.png)

![](https://raw.githubusercontent.com/okofish/TwitchView/gh-pages/images/screenshot2.png)

### Copyright
Code is adapted heavily from Apple's TVMLAudioVideo example app. All Twitch streams are property of their respective owners.