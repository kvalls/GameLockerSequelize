module.exports = app => {
  const game = require("../controllers/game.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Game
  // DECOMMENT:
  router.post("/", upload.single('file'), game.create);
  // router.post("/", game.create);

  // Retrieve all Games
  router.get("/", game.findAll);

  // Retrieve a single Game with id
  router.get("/:id", game.findOne);

  // Update a Game with id
  router.put("/:id", upload.single('file'), game.update);

  // Delete a Game with id
  router.delete("/:id", game.delete);

  app.use("/api/games", router);
}