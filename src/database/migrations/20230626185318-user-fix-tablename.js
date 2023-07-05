module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.renameColumn('users', 'nome', 'name');
  },




  down: (queryInterface) => queryInterface.dropTable('users'),
};