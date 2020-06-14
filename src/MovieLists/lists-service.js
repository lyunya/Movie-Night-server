const MovieListsService = {
  getAllLists(db) {
    return db.select("*").from("movienight_lists")
  },

  insertList(db, newList) {
    return db
      .insert(newList)
      .into("movienight_lists")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
    getById(db, id) {
      return db.from("movienight_lists").select("*").where("id", id).first()
  },
    deleteList(db, id) {
      return db("movienight_lists").where({ id }).delete();
  },
    updateList(db, id, newMovieListFields) {
      return db("movienight_lists").where({ id }).update(newMovieListFields)
  },
};

module.exports = MovieListsService;
