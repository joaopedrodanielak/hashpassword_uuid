'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        email: "joaopdanielak@hotmail.com",
        firstName : "Joao",
        lastName : "Danielak",
        password : "123123",
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
