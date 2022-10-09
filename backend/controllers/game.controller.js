const db = require("../models");
const Game = db.gamelocker;
const Op = db.Sequelize.Op;

// Create and Save a new Game
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price || !req.body.genre || !req.body.description || !req.body.sales) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Game
  const game = {
    name: req.body.name,
    price: req.body.price,
    genre: req.body.genre,
    description: req.body.description,
    sales: req.body.sales,
    image: req.file ? req.file.image : ""
  }

  // Save Game in the database
  Game.create(game).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the game"
    })
  });
};

// Retrieve all Game from the database.
exports.findAll = (req, res) => {
  Game.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all games"
    })
  })
};

// Find a single Game with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Game.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Game with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Game with id=" + id
      });
    });
}

// Update a Game by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price || !req.body.genre || !req.body.description || !req.body.sales) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Game
  const game = {
    name: req.body.name,
    price: req.body.price,
    genre: req.body.genre,
    description: req.body.description,
    sales: req.body.sales,
    image: req.file ? req.file.image : ""
  }
  const id = req.params.id;
  Game.update(game, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Game was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Game with id=${id}. Maybe Game was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Game with id=" + id
      });
    });
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Game.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Game was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Game with id=${id}. Maybe Game was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Game with id=" + id
      });
    });
};