
const fetchData = (fetchFunc) => {
  let out;
  try {
    out = await fetchFunc();
  } catch (err) {
    data
  }
  return data
}

const resolvers = {
  WorkOrder: {
    brewMethod: async (parent, args, context, info) => {
      const data = await context.models.brewMethod.findOne({
        where: {
          id: parent.get('brewMethodID'),
        }
      });
      return data;
    },
    coffee: async (parent, args, context, info) => {
      const data = await context.models.coffee.findOne({
        where: {
          id: parent.get('coffeeID'),
        }
      });
      return data
    },
    caseType: async (parent, args, context, info) => {
      const data = await context.models.caseType.findOne({
        where: {
          id: parent.get('caseTypeID'),
        }
      });
      return data;
    },
  },
  Query: {
    workOrders: async (parent, args, { models }, info) => {
      const data = await models.workOrder.findAll();
      return data;
    },
    brewMethods: (parent, args, { models }, info) => models.brewMethod.findAll(),
    coffees: (parent, args, { models }, info) => models.coffee.findAll(),
    caseTypes: (parent, args, { models }, info) => models.caseType.findAll(),
  },
  Mutation: {
    createWorkOrder: async (_, args, context, info) => {
      const { models } = context;
      const { workOrder } = models;
      const saved = await workOrder.create(args);
      return saved;
    }
  }
}

export default resolvers;