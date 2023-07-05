module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('students', 'students_user_id_foreign_idx');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
