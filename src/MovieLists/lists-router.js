const path = require("path");
const express = require("express");
const xss = require("xss");
const ListsServices = require("./lists-service");
const { requireAuth } = require("../middleware/jwt-auth");
const listsRouter = express.Router();
const bodyParser = express.json();

const serializeList = (list) => ({
  id: list.id,
  name: xss(list.name),
  user_id: list.user_id,
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
  .post(requireAuth, bodyParser, (req, res, next) => {
    // const { }
    const newList = req.body;
    const knex = req.app.get("db");
    if (!newList.name) {
      return res.status(400).json({
        error: { message: "Must have a list name" },
      });
    }
    ListsServices.insertList(knex, newList)
      .then((list) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${list.id}`))
          .json(list);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    ListsServices.deleteList(req.app.get("db"), req.body.id)
      .then((affected) => {
        res.status(204).end();
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
