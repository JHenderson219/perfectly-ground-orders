

# perfectly-ground-orders

## Step 1: Project Setup 

### Install and setup NodeJS
Install Links:


[Windows & Mac](https://nodejs.org/en/download/)

### Install your package manager of choice
[Yarn](https://yarnpkg.com/en/docs/install)

[NPM](https://www.npmjs.com/get-npm)

 ### Fork the repo / download code
 If you have any issues getting the code, please contact me immediately and I will get them resolved:
 
 hendersonj219@gmail.com

 805.305.9903
 
### Install nodemon globally
[Nodemon](https://www.npmjs.com/package/nodemon)
`yarn global add nodemon`
`npm install --global nodemon`

### Install and setup PostgreSQL
Install links:


[Windows](https://www.postgresql.org/download/windows/)

[Mac](https://www.postgresql.org/download/macosx/)
### Install dependencies
From the project root:

`npm setup`

or

`yarn setup`

This should install dependencies in the project root, `/server`, and `/client` sub-directories, then navigate back to the project root where you will be able to launch the app.

#### Dependency Troubleshooting

If this command fails, you can install dependencies manually by running the install command in the root, then navigating to each directory and running the install command on each sub-directory in turn.
## Step 2: Write a .env file
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

## Step 3: Launch the app

From the project root:

`npm dev`

`yarn dev`

This should use `concurrently` to spin up the database, start the api, and then launch the client-side app.

The app should now be available on `http:\\localhost:3000`

### Running tests
`cd /client && yarn test` (or `npm test`)

and


`cd /server && yarn test` (or `npm test`)

### Possible known issues
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
 - [Material UI](https://material-ui.com/)
 - [Formik](https://jaredpalmer.com/formik/)
 - [Material UI Datatables](https://github.com/gregnb/mui-datatables)

### High Level Architecture Diagrams
[Diagrams](https://drive.google.com/file/d/1fEg3t5-5A9t2SoHJo5285_xKvMc6vNC_/view?usp=sharing)

## Notable Design Choices
### CaseType table

 1. Work orders have a restriction of 25 or 50 packets per order
 2. I considered using an `enum` value on the `WorkOrders` table
 3. I reasoned that these 25 or 50-packet boxes are dictated by the size of actual boxes in the real world.
 4. It is not unreasonable that we might want to change available box sizes later without needing to update the database schema.
 5. Thus, it would make sense to use an additional table to describe these cases

### Sequelize ORM

 1. Well-documented and supported ORM for express which can make use of a variety of SQL dialects
 2. Drastically simplified database access code

### GraphQL / Apollo
 1. Front-end state management via Apollo - all the benefits of redux, and normalizer while reducing front-end code
 2. GraphQL is excellent for dealing with hierarchical data, which was a concern for this application
 3. Single source of truth for both local application state and remote data states

### React
 1. Excels at displaying data on the page using a one-way data binding, which was a great fit for this application
 2. Encourages composition over inheritance and the development of functional components

### Material UI

 1. Well-supported React implementation of Material components
 2. Good docs and demos, many options for permuting the components

### Formik

 1. Well-supported form library for React
 2. Good docs, feature rich, made the create order form very simple to set up and reason about

### Material UI Datatables

 1. React / Material implementation similar to the popular [jQuery datatables](https://datatables.net/) library
 2. Many useful features, including custom sorting, filtering, searching
 3. Clean and clear docs

## Deployment / Production Readiness

In general, this app is nearly ready for production use. The client and server code are at slightly different levels of readiness.

### Client
The client code is essentially ready to be built and deployed to production. Create React App defaults should be sufficient for building the application.

### Server
The server code requires one step to be completed before it is ready for production. Webpack must be installed and configured to transpile and package our server code. Then, our server code will be ready to deploy.

### Deployment
This application has been designed as a monolith, so deploying it as such would be a reasonable step. To ease devops burden, it would be advisable to leverage a continuous integration service to automatically manage deployments. Any popular hosting service would be sufficient to host the deployed application.
