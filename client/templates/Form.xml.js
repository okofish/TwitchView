var Form = function(placeholder) { return '<?xml version="1.0" encoding="UTF-8" ?>' +
'<document>' +
'  <formTemplate>' +
'    <banner>' +
'      <title>TwitchView</title>' +
'      <description>Enter a Twitch channel, or just press Play to go with the default.</description>' +
'    </banner>' +
'    <textField id="channel">' + placeholder + '</textField>' +
'    <footer>' +
'      <button id="play">' +
'        <text>Play</text>' +
'      </button>' +
'    </footer>' +
'  </formTemplate>' +
'</document>'
}