'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    'ProductTypes',
    [
      {
        name: 'CO',
        desc:"",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'WI',
        desc:"",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
