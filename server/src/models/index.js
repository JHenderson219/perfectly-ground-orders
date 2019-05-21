import Sequelize from 'sequelize';
require('dotenv').config()
export const sequelize = new Sequelize(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
    typeValidation: true,
  },
);

const models = {
  WorkOrder: sequelize.import('./work_order'),
  BrewMethod: sequelize.import('./brew_method'),
  CaseType: sequelize.import('./case_type'),
  Coffee: sequelize.import('./coffee'),
}

export default models;