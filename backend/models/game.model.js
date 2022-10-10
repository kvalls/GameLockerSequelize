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
    filename: {
      type: Sequelize.STRING
    },
  },{
    timestamps: false
  });

  return Game;
}