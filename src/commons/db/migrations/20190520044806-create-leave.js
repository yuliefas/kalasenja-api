module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Leaves', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    leaveRange: {
      type: Sequelize.RANGE(Sequelize.DATEONLY),
    },
    leaveTimeRange: {
      type: Sequelize.RANGE(Sequelize.DATE),
    },
    UserId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Leaves'),
};
