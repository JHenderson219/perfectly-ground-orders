import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

const models = {
  WorkOrder: sequelize.import('./work_order'),
  BrewMethod: sequelize.import('./brew_method'),
  CaseType: sequelize.import('./case_type'),
  Coffee: sequelize.import('./coffee'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;