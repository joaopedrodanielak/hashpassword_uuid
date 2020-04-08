const { v4: uuidv4 } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        unique : true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4()
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull : false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      role : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};