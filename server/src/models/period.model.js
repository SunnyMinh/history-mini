const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Period = sequelize.define(
  'Period',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    period_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    time_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'periods',
    timestamps: false,
  }
);

module.exports = Period;