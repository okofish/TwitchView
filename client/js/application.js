var DEFAULT = 'bobross';

App.onLaunch = function(options) {

  var BASEURL = options.BASEURL;

  var scripts = [`${BASEURL}/templates/Form.xml.js`];

  evaluateScripts(scripts, function(success) {
    if (success) {
    var index = Form(DEFAULT),
      PARSER = new DOMParser(),
      doc = PARSER.parseFromString(index, "application/xml");

      doc.addEventListener("select", startPlayback);
      doc.addEventListener("play", startPlayback);

      navigationDocument.pushDocument(doc);
    } else {

      var error = new Error("Playback Example: unable to evaluate scripts.");
      throw (error);
    }
  });
};

function startPlayback() {
  var channelfield = navigationDocument.documents[navigationDocument.documents.length - 1].getElementById("channel").getFeature("Keyboard");
  var channel = channelfield.text || DEFAULT;
  
  getVideos(channel, function(videos) {

    var player = new Player();

    player.playlist = new Playlist();

    videos.forEach(function(metadata) {

      var video = new MediaItem('video', metadata.url);

      video.title = metadata.title;
      video.subtitle = metadata.subtitle;
      video.artworkImageURL = metadata.artworkImageURL;

      video.contentRatingDomain = metadata.contentRatingDomain;
      video.contentRatingRanking = metadata.contentRatingRanking;

      player.playlist.push(video);
    });


    player.play();
  })
}

function getVideos(channel, cb) {

  // from http://stackoverflow.com/a/111545
  function EncodeQueryData(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.addEventListener("load", function() {
    var querystring = EncodeQueryData(xhr.response);
    
    getChannelData(channel,function(channeldata){
      var videos = [{
          title: channeldata['display_name'] + ' playing ' + channeldata['game'],
          subtitle: channeldata['status'],
          artworkImageURL: channeldata['logo'],
          contentRatingDomain: "tvshow",
          contentRatingRanking: channeldata.mature ? 1000 : 600,
          url: 'http://usher.twitch.tv/api/channel/hls/' + channel + '.m3u8?' + querystring
        }];

      // execute callback
      cb(videos);
    })

  }, false);
  xhr.open("GET", 'https://api.twitch.tv/api/channels/' + channel + '/access_token', true);
  xhr.send();
  return xhr;
}


function getChannelData(channel, cb) {

  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.addEventListener("load", function() {
    
    // execute callback
    cb(xhr.response);

  }, false);
  xhr.open("GET", 'https://api.twitch.tv/kraken/channels/' + channel, true);
  xhr.send();
  return xhr;
}
