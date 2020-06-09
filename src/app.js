require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config');
const winston = require("winston");
const listsRouter = require('./MovieLists/lists-router');
const moviesRouter = require('./Movies/movies-router')
const MovieListsService = require("./MovieLists/lists-service");

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, MovieNight!')
})

app.get('/lists', (req, res, next) => {
  const KnexInstance = req.app.get('db')
  MovieListsService.getAllLists(KnexInstance)
    .then(lists => {
      res.json(lists)
    })
    .catch(next)
})

app.use('/api/lists', listsRouter);
app.use('/api/movies', moviesRouter)

 app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
   res.status(500).json(response)
 })

 // set up winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

module.exports = app;   
