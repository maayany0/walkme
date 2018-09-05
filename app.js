'use strict'
//Load express module with `require` directive
var routs = require('./client/routs.js')
var express = require('express')
var app = express()
//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use('/campaigns', routs)
//Launch listening server on port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

