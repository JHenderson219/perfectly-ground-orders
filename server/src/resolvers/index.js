import { sanitizeCreateWorkOrder, getOneByID } from './utils';

const resolvers = {
  WorkOrder: {
    brewMethod: async (parent, args, { models }, info) => {
      // no need to try-catch these awaits
      // Apollo Server handles errors thrown from resolversc
      const model = models.brewMethod;
      const data = await getOneByID(model, parent.get('brewMethodID'));
      return data;
    },
    coffee: async (parent, args, { models }, info) => {
      const model = models.coffee;
      const data = await getOneByID(model, parent.get('coffeeID'));
      return data
    },
    caseType: async (parent, args, { models }, info) => {
      const model = models.caseType;
      const data = await getOneByID(model, parent.get('caseTypeID'));
      return data;
    },
  },
  Query: {
    workOrders: async (parent, args, { models }, info) => {
      const data = await models.workOrder.findAll();
      return data;
    },
    brewMethods: async (parent, args, { models }, info) => {
      return models.brewMethod.findAll()
    },
    coffees: (parent, args, { models }, info) => models.coffee.findAll(),
    caseTypes: (parent, args, { models }, info) => models.caseType.findAll(),
  },
  Mutation: {
    createWorkOrder: async (_, args, { models }, info) => {
      const { workOrder } = models;
      const sanitized = sanitizeCreateWorkOrder(args);
      const saved = await workOrder.create(sanitized);
      return saved;
    }
  }
}

export default resolvers;