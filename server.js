var express = require('express'),
    ejsLocals = require('ejs-locals'),
    app = express(),
    pages = require(__dirname + '/js/pages_controller');

app.set('port', (process.env.PORT || 5000));

app.engine('ejs', ejsLocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// set view locals
app.use(function (req, res, next) {
  app.locals.route = req.url;
  next();
})

// mount routes
app.get('/ss', function (request, response) { response.redirect('tests-1'); });

app.get('/home', pages.home);
app.get('/about', pages.about);
app.get('/htest', pages.htest);
app.get('/hanoi', pages.hanoi);

app.get('/hello', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;

