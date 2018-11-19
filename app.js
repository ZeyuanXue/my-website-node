var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');


var app = express();
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/view/index.html'));
});

app.get('/view/js/:js', function(req, res){
  res.sendFile(path.join(__dirname,'/view/js/'+req.params.js));
});

app.get('/view/css/:css', function(req, res){
  res.sendFile(path.join(__dirname,'/view/css/'+req.params.css));
});

app.get('/:page', function(req, res){
  if (req.params.page=='index'){
    res.redirect('/');
    return;
  }
  res.sendFile(path.join(__dirname, '/view/'+req.params.page+'.html'));
});

app.get('/view/language/:lang',function(req, res){
  res.sendFile(path.join(__dirname,'/view/language/lang_'+req.params.lang+".json"));
});

app.get('/view/css/fonts/:font' ,function(req, res){
  //TODO: Handle All kinds browser - DONE? ttf might be supported by all browsers
  res.sendFile(path.join(__dirname,'/view/css/fonts/'+req.params.font+'.ttf'));

});
app.get('/view/imgs/:img' ,function(req, res){
  //TODO: Handle All kinds browser - DONE? ttf might be supported by all browsers
  res.sendFile(path.join(__dirname,'/view/imgs/'+req.params.img));

});

app.get('/view/files/:file' ,function(req, res){
  //TODO: Handle All kinds browser - DONE? ttf might be supported by all browsers
  res.sendFile(path.join(__dirname,'/view/files/'+req.params.file));
});


module.exports = app;
