'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      {
        role_name: 'Admin',
        description: 'Can manage users, periods, and events',
      },
      {
        role_name: 'Viewer',
        description: 'Can view historical content',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', {
      role_name: ['Admin', 'Viewer'],
    });
  },
};