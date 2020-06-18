const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeMovieListsArray } = require("./test-helpers");
const { makeUsersArray } = require("./test-helpers");
const { makeMoviesArray } = require('./test-helpers');

describe("Movies Endpoint", function () {
    let db

    before("make knex instance", () => {
      db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set('db', db)
    });

    after("disconnect from db", () => db.destroy());

    before("clean the table", () =>
      db.raw("TRUNCATE movienight_lists, movienight_movies RESTART IDENTITY CASCADE")
    );

    afterEach("cleanup", () => {db.raw(
        "TRUNCATE movienight_lists, movienight_movies RESTART IDENTITY CASCADE"
      )
    })    
       describe(`GET /api/movies`,()=>{
        context(`Given no movies`,()=>{
            it(`responds with 200 and an empty movie`,()=>{
                return supertest(app)
                .get('/api/movies')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(200,[])
            })
        })
        context(`Given movies in the db`,()=>{
            const testUsers = makeUsersArray()
            const testLists = makeMovieListsArray(testUsers);
            const testMovies = makeMoviesArray(testLists);

            beforeEach(`insert lists and movies`,()=>{
                return db
                    .into('movienight_users')
                    .insert(testUsers)
                    .then(() => {                  
                    return db
                    .into('movienight_lists')
                    .insert(testLists)})
                    .then(()=>{
                        return db
                            .into('movienight_movies')
                            .insert(testMovies)
                    })
            })
              it(`responds with all movies`,()=>{
                return supertest(app)
                    .get('/api/movies')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testMovies)
            })
        })     
       })
})