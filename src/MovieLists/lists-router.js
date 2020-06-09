const path = require("path");
const express = require("express");
const xss = require("xss");
const ListsServices = require("./lists-service");

const listsRouter = express.Router();
const jsonParser = express.json();

const serializeList = (list) => ({
  id: list.id,
  list_name: xss(list.name),
});

listsRouter
  .route("/") //get all lists
  .get((req, res, next) => {
    const knex = req.app.get("db");
    ListsServices.getAllLists(knex)
      .then((lists) => {
        res.json(lists.map(serializeList));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newList = { name };
    const knex = req.app.get("db");
    if (!name) {
      return res.status(400).json({
        error: { message: "Must have a list name" },
      });
    }

    ListsServices.insertList(knex, newList)
      .then((list) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${list.id}`))
          .json(serializeFolder(list));
      })
      .catch(next);
  });

listsRouter
  .route("/:id")
  .all((req, res, next) => {
    ListsServices.getById(req.app.get("db"), req.params.id)
      .then((list) => {
        if (!list) {
          return res.status(404).json({
            error: { message: `list doesn't exist` },
          });
        }
        res.name = list;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeList(res.name));
  })
  .delete((req, res, next) => {
    ListsServices.deleteList(req.app.get("db"), req.params.id)
      .then((affected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = listsRouter;