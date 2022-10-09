module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("game", {
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    genre: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    sales: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Game;
}