require('dotenv').config();
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './src/graphql/schema';
import resolvers from './src/resolvers';
import { json, urlencoded } from 'body-parser';
import models, { sequelize } from './src/models';
import seedData from './src/models/seed_data';
// todo: move this file to src folder
// todo: try-catch resolver await calls - how do this?
// todo: sanitize inputs on mutation
// todo: tests for back-end
// todo: fix env vars
// todo: figure out build / deploy
// todo: figure out env files / variables
// todo: figure out scripts and that babel bug
// todo: diagram the system
// todo: readme with good instructions and detail
// todo: actually use a .graphql file for the schema
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