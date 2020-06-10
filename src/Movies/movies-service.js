const MoviesService = {
  getAllMovies(db) {
    return db.select("*").from("movienight_movies");
  },

  insertMovie(db, newMovies) {
    return db
      .insert(newMovies)
      .into("movienight_movies")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db.from("movienight_movies").select("*").where("id", id).first();
  },
  deleteMovie(db, id) {
    return db("movienight_movies").where({ id }).delete();
  },
  updateMovie(db, newMovieVotes) {
    return db("movienight_movies").where("id", id).update(newMovieVotes);
  },
};

module.exports = MoviesService;
