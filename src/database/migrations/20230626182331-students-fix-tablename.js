module.exports = {

  up: async (queryInterface, Sequelize) => {

    // await queryInterface.renameColumn('students', 'nome', 'name');
    await queryInterface.renameColumn('students', 'Sobrenome', 'lastname');
    await queryInterface.renameColumn('students', 'idade', 'age');
    await queryInterface.renameColumn('students', 'peso', 'weight');
    await queryInterface.renameColumn('students', 'Altura', 'height');

  },




  down: (queryInterface) => queryInterface.dropTable('students'),
};