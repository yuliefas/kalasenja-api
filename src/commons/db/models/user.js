const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
  }, {
    paranoid: true, // soft delete
  });
  User.associate = function (models) {
    // models.Airline.hasMany(models.AirlineTerminal, { foreignKey: 'airlineId' });
    models.User.hasMany(models.Leave);
  };

  User.beforeCreate(user => user.id = uuidv4());

  return User;
};
