import BREW_METHODS from './mock_data/BREW_METHODS.json';
import COFFEE from './mock_data/COFFEE.json';
import CASE_TYPE from './mock_data/CASE_TYPE.json';
import WORK_ORDERS from './mock_data/WORK_ORDERS.json';

const seedData = async (models) => {
  await models.BrewMethod.bulkCreate(BREW_METHODS);
  await models.Coffee.bulkCreate(COFFEE);
  await models.CaseType.bulkCreate(CASE_TYPE)
  await models.WorkOrder.bulkCreate(WORK_ORDERS);
}
export default seedData;