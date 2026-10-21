//import modules
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
//initialize application
const app = express();
//morgan middleware to log request with dev format
app.use(morgan('dev'));
//cache store and API insertion
const cache = {};
const OMDB_API_KEY = '990e0c2b';
//define route and query handling
app.get('/', (req, res) => {
  const cacheKey = req.url;
  //cache hit
  if (cache[cacheKey]) {
    return res.status(200).json(cache[cacheKey]);
  }
  //identify the ID and Title query parameter
  const params = {
    apiKey: OMDB_API_KEY
  };

 var movie = req.originalUrl;
 console.log(movie);
  //initiate request for promise return
  axios.get('http://www.omdbapi.com/' + movie + '&apikey=990e0c2b')
  .then(response => {
    cache[cacheKey] = response.data;
    res.status(200).json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});
// When making calls to the OMDB API make sure to append the 'apikey=8730e0e' parameter
module.exports = app;