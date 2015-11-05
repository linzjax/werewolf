var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('./index.html', { root: __dirname });
});

var server = app.listen(29600, function () {
  var host = server.address().address;
  var port = server.address().port;
});
