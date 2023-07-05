module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('tables', {

    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    tablename: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    students_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'students',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',

    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,

    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,

    },
    columfield: {
      type: Sequelize.JSON,
      allowNull: true,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('tables'),
};




