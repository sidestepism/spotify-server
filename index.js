var express = require('express');
var app = express();
var exec = require('child_process').exec;
var spotifyPath = "/usr/local/bin/spotify"

var spotify = function(res, cmd){
    console.log(cmd);
    exec([spotifyPath, cmd].join(" "), function(err, stdout, stderr){
        console.log(err, stdout, stderr);
        res.send(stdout + stderr)
    });
}

app.get('/', function (req, res) {
  res.send('Usage: GET /play, /stop, /volume/100');
});

app.get('/play', function (req, res) {
    spotify(res, 'play');
});

app.get('/play/*/*', function (req, res) {
    if(req.params[0].match(/[^a-zA-Z0-9]/)){
        return res.send('invalid request')
    }
    if(req.params[1].match(/[^a-zA-Z0-9]/)){
        return res.send('invalid request')
    }
    spotify(res, ['play', req.params[0], req.params[1]].join(' '));
});

app.get('/pause', function (req, res) {
    spotify(res, 'pause');
});

app.get('/vol/up', function (req, res) {
    spotify(res, 'vol up');
});

app.get('/vol/down', function (req, res) {
    spotify(res, 'vol down');
});

app.get('/vol/*', function (req, res) {
    var vol = req.params[0]
    if(req.params[0].match(/[^0-9]/)){
        return res.send('invalid request')
    }
    if(vol > 100 || vol < 0){
        return res.send('invalid request')
    }
    spotify(res, 'volume' + req.params[0]);
});

app.listen(4600, function () {
  console.log('Spotlight server is listening on 4600');
});
