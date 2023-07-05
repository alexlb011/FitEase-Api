module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('students', 'user_id', {

      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'students',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',

    });
  },
  down: (queryInterface) => queryInterface.dropTable('students'),
};