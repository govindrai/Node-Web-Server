'use strict';

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

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

app.listen(3000, () => {
  console.log("Server is up and running on port 3000")
})