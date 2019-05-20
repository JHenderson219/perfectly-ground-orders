import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './src/graphql/schema';
import resolvers from './src/resolvers';
import { json, urlencoded } from 'body-parser';
import models, { sequelize } from './src/models';
import seedData from './src/models/seed_data';
const configResult = require('dotenv').config();

// todo: tests for back-end
// todo: diagram the system
// todo: readme with good instructions and detail
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: sequelize,
})
const app = express();

server.applyMiddleware({ app });

app.use(express.static("app/public"));

const port = process.env.PORT || 5000;
app.use(json());
app.use(urlencoded({ extended: true }));

const eraseDatabaseOnSync = true;
const options = { force: eraseDatabaseOnSync };
sequelize.sync(options).then(async () => {
  try {
    await seedData(models);
  } catch (err) {
    console.error(err);
  }
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}).catch((err) => {
  console.error(err);
})