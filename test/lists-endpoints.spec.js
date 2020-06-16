const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeMovieListsArray } = require("./test-helpers");
const { makeUsersArray } = require("./test-helpers");

describe("Lists Endpoints", function () {
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
      db.raw("TRUNCATE movienight_lists, movienight_users RESTART IDENTITY CASCADE")
    );

    afterEach("cleanup", () => db.raw("TRUNCATE movienight_lists, movienight_users RESTART IDENTITY CASCADE")
    );

    describe(`GET /api/lists`,()=>{
        context(`Given no lists`,()=>{
            it(`responds with 200 and an empty list`,()=>{
                return supertest(app)
                .get('/api/lists')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(200,[])
            })
        })//end context no lists
        context(`Given lists in the db`,()=>{
            const testUsers = makeUsersArray()
            const testlists = makeMovieListsArray()

            beforeEach(`insert users and lists`,()=>{
                return db
                    .into('movienight_users')
                    .insert(testUsers)
                    .then(()=>{
                        return db
                            .into('movienight_lists')
                            .insert(testlists)
                    })
            })//end beforeEach
              it(`responds with all lists`,()=>{
                return supertest(app)
                    .get('/api/lists')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testlists)
            })//end it with goals in db
        })//end context goals in db       
    })//end describe GET
});
