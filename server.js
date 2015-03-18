var express = require('express'),
    app = express(),
    pages = require(__dirname + '/js/pages_controller');

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

// mount routes
app.get('/ss', function (request, response) { response.redirect('tests-1'); });

app.get('/home', pages.home);

app.get('/hello', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;

