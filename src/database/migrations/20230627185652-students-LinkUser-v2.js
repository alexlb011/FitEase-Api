module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('students', 'user_id', {

      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',

    });
  },
  down: (queryInterface) => queryInterface.dropTable('students'),
};