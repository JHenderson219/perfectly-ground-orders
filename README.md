
# perfectly-ground-orders

## Quick Start

### Setup
#### Install and setup NodeJS
Install Links:
[Windows & Mac](https://nodejs.org/en/download/)

#### Install your package manager of choice
[Yarn](https://yarnpkg.com/en/docs/install)


[NPM](https://www.npmjs.com/get-npm)
 #### Fork the repo / download code
 If you have any issues getting the code, please contact me immediately and I will get them resolved:
 hendersonj219@gmail.com


 805.305.9903
#### Install nodemon globally
[Nodemon](https://www.npmjs.com/package/nodemon)
`yarn global add nodemon`
`npm install --global nodemon`
#### Install and setup PostgreSQL
Install links:
[Windows](https://www.postgresql.org/download/windows/)


[Mac](https://www.postgresql.org/download/macosx/)
 #### Write a .env file
 From the project root:
`cd ./server` 
Create a .env file to point the server at your local PostgreSQL database. Place it in `./server`.

It should look like:

    DB_HOST=YOUR_SERVER_HOST_NAME_HERE
    DB_USER=YOUR_SERVER_SUPERUSER_HERE
    DB_PASS=YOUR_SUPERUSER_PASSWORD_HERE

If the server fails to start with the .env file, try replacing the environment variables on lines 4-6 of `./server/models/index.js` with the literal values, so:

    export  const  sequelize  =  new  Sequelize(
	    YOUR_SERVER_HOST_NAME_HERE,
	    YOUR_SERVER_SUPERUSER_HERE,
	    YOUR_SUPERUSER_PASSWORD_HERE,
	    {
		    host:  'localhost',
		    dialect:  'postgres',
	    },
	);

#### Install dependencies: 
From the project root:
`npm setup`


`yarn setup`
This should install dependencies in the project root, `/server`, and `/client` sub-directories, then navigate back to the project root where you will be able to launch the app.

If this command fails, you can install dependencies manually by running the install command in the root, then navigating to each directory and running the install command on each sub-directory in turn.
#### Launch the app
`npm dev`


`yarn dev`

This should use `concurrently` to spin up the database, start the api, and then launch the client-side app.

The app should now be available on `http:\\localhost:3000`

#### Running tests
`cd /client && yarn test` (or `npm test`)
`cd /server && yarn test` (or `npm test`)

#### Possible known issues
During development, my local machine was having issues with running `babel-node` as a global command line function. This utility is being used in the `server` command (in the root `package.json`) to transpile the server code to ES5 on the fly.

I resolved this issue by specifying the literal path to the program's location in `./server/node_modules`, which should be `./server/node_modules/.bin/babel-node`.

If experiencing this issue, try locating where `babel-node` is installed for you, and updating the `server` script to run the appropriate command. Your new `server` command should look like:

 `cd server && nodemon index.js --exec PATH/TO/BABEL-NODE --presets babel-preset-env`
## Architecture
### Stack
#### Back End
Database: PostgresSQL
ORM: [Sequelize](http://docs.sequelizejs.com/)
API: Express / [Apollo Server](https://www.apollographql.com/docs/apollo-server/) GraphQL API
#### Front End
Data access / GraphQL Client: [Apollo Client](https://www.apollographql.com/docs/react/) via Apollo Boost
UI Framework: React (via Create React App)
Notable UI Libraries:
 - Material UI
 - Formik
 - Material UI Datatables
### Architecture Diagrams
[Diagrams (Hosted at Draw.io)](https://drive.google.com/file/d/1Ba7PWk22Abm7UQzb9lhTJprbdameBYmp/view?usp=sharing)

## Notable Design Choices
### CaseType table
In implementing the restriction of case sizes to only 25 or 50 packets for each work order, I elected to use an additional table instead of using an `enum` value on the WorkOrders table. 

I reason that the size of these 25 or 50-packet boxes are dictated by the size of actual boxes in the real world. It is not unreasonable that we might want to expand the capabilities of this system later by increasing the variety of box sizes, possibly without needing a developer to be involved to update an `enum`. 

With `CaseTypes` as its own table, it would be a relatively easy matter to implement a feature to add / remove `CaseTypes` to account for differently sized boxes.

### GraphQL
A reasonable question might be: Why GraphQL? There were several reasons for this choice. 

First, Apollo is an incredibly powerful front-end state management and data access solution. It provides all of the benefits of Redux, while adding in auto-normalized data access to our server via a GraphQL client. It reduces client-side code, which reduces testing burden and the possibility of bugs. It also drastically speeds front-end development time by making it significantly easier to get the data one needs.

Second, GraphQL excels when dealing with hierarchical data. This application had several instances of needing such data at different points. Using GraphQL meant that accessing this data in exactly the form needed was trivial.
## Deployment / Production Readiness

In general, this app is nearly ready for production use. The client and server code are at slightly different levels of readiness.

### Client
The client code is essentially ready to be built and deployed to production. Create React App defaults should be sufficient for building the application.

### Server
The server code requires one step to be completed before it is ready for production. Webpack must be installed and configured to transpile and package our server code. This should be a relatively trivial step. Then, our server code will be ready to deploy.

### Deployment
This application has been designed as a monolith, so deploying it as such would be a reasonable step. To ease devops burden, it would be advisable to leverage a continuous integration service to automatically manage deployments. Any popular hosting service would be sufficient to host the deployed application.
