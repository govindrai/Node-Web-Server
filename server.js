'use strict';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var activity = `${new Date().toString()}: ${req.method} ${req.url}\n`;
  fs.appendFile('server.log', activity, () => {
    console.log(activity);
  });
  next();
});

// uncomment if in maintenance mode
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send({
    name: "Govind",
    likes: [
      'Coding',
      'Mangoes'
    ]
  })
})

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>')
  res.render("about.hbs", {
    pageTitle: "About Page",
    pageText: "Govind Stop Skipping the video",
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send({
    statusCode: 404,
    message: "Bad Request, Brah"
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});