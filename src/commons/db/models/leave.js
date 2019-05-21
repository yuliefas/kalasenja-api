const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    // leaveRange: DataTypes.ARRAY(DataTypes.RANGE(DataTypes.DATEONLY)),
    leaveRange: DataTypes.RANGE(DataTypes.DATEONLY),
    leaveTimeRange: DataTypes.RANGE(DataTypes.DATE),
    UserId: DataTypes.UUID,
  }, {});
  Leave.associate = function (models) {
    models.Leave.belongsTo(models.User);
  };

  Leave.beforeCreate(leave => leave.id = uuidv4());

  return Leave;
};
