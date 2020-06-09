const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeListsArray } = require('./lists.fixtures')

describe.only("Lists Endpoints", function () {
    let db;

    before("make knex instance", () => {
      db = knex({
        client: "pg",
        connection: process.env.TEST_DB_URL,
      });
      app.set('db', db)
    });

    after("disconnect from db", () => db.destroy());

    before("clean the table", () => db("movienight_lists").truncate())

    afterEach("cleanup", () => db("movienight_lists").truncate());

    context('Given there are lists in the database', () => {
        const testLists = makeListsArray()
        
        beforeEach('insert lists', () => {
            return db
                .into('movienight_lists')
                .insert(testLists)
        })

        it('Get /lists responds with 200 and all of the lists', () => {
            return supertest(app)
            .get('/lists')
            .expect(200)
            //TODO: add more assertionms about the body
        })
    })
});

