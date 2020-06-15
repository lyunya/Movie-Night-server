const path = require("path");
const express = require("express");
const MoviesService = require("./movies-service");
const moviesRouter = express.Router();
const bodyParser = express.json();

const movie = (movie) => ({
   id: movie.id,
   title: movie.title,
   overview: movie.overview,
   poster_path: movie.poster_path,
   movielist_id: movie.movielist_id,
   votes: movie.votes
});

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
    MoviesService.updateMovie(req.app.get("db"), movieToUpdate.id, movieToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
    .catch(next);
  });


// moviesRouter
//   .route("/:id")
//   .all((req, res, next) => {
//     MoviesService.getById(req.app.get("db"), req.params.id)
//       .then((movie) => {
//         if (!movie) {
//           return res.status(404).json({
//             error: { message: `Movie doesn't exist` },
//           });
//         }
//         res.movie = movie; // save the movie for the next middleware
//         next(); // don't forget to call next so the next middleware happens!
//       })
//       .catch(next);
//   })
//   .get((req, res, next) => {
//     res.json(res.movie);
//   })
//   .delete((req, res, next) => {
//     MoviesService.deleteMovie(req.app.get("db"), req.params.id)
//       .then(() => {
//         res.status(204).end();
//       })
//       .catch(next);
//   })
//   .patch(bodyParser, (req, res, next) => {
//     const { votes } = req.body;
//     const movieToUpdate = { votes };

//     MoviesService.updateMovie(req.app.get("db"), req.params.id, movieToUpdate)
//       .then((numRowsAffected) => {
//         res.status(204).end();
//       })
//       .catch(next);
//   });
module.exports = moviesRouter;
