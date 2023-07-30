const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('type', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },
      nameType: {
         type: DataTypes.STRING,
         allowNull: false,
      }
   }, { 
      freezeTableName: true,
      timestamps: false 
   });
};