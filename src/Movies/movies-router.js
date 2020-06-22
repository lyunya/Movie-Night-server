const express = require("express");
const MoviesService = require("./movies-service");
const moviesRouter = express.Router();
const bodyParser = express.json();

moviesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    MoviesService.getAllMovies(knexInstance)
      .then((movies) => {
        res.json(movies);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { title, overview, poster_path, movielist_id, votes } = req.body;
    const newMovie = { title, overview, poster_path, movielist_id, votes };
    for (const [key, value] of Object.entries(newMovie)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }
    MoviesService.insertMovie(req.app.get("db"), newMovie)
      .then((movie) => {
        res
          .status(201)

          .json(movie);
      })
      .catch(next);
  })
  .put(bodyParser, (req, res, next) => {
    const { id, title, overview, poster_path, movielist_id, votes } = req.body;
    const movieToUpdate = {
      id,
      title,
      overview,
      poster_path,
      movielist_id,
      votes,
    };
    MoviesService.updateMovie(
      req.app.get("db"),
      movieToUpdate.id,
      movieToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = moviesRouter;
