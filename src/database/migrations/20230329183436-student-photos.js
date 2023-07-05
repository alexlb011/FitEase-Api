const sequelize = require("sequelize");

module.exports = {

  up: (queryInterface, Sequelize) => queryInterface.createTable('photos', {

    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    originalname: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    fieldname: {
      type: Sequelize.STRING,
      allowNull: false,

    },
    students_id: {
      type: sequelize.INTEGER,
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

  }),

  down: (queryInterface) => queryInterface.dropTable('photos'),
};






