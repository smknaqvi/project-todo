# Team ToDo.

This project is a MVP of a web application for SportCred. It is built using the MERN stack.

## Documentation

Documentation for each sprint can be found in `./docs`.

## Run App Locally

You will need to run our front end and back end application separately.

### Requirements

1. You must have `node` installed and be able to use `npm`
2. You will also need to configure an `.env` file. A template can be found below.

### Back End Setup

1. `cd backend`
2. `npm install`
3. `npm run start`

If you want your application to live reload on file changes please install `nodemon` by running `npm i nodemon` and for step 3 run `nodemon ./server.js` instead.

#### `.env` file example

```
PORT=5000 // The port number should not be changed (unless you plan on updating the front end as well)
DB_URI=mongodb+srv://<username>:<password>@<example>.mongodb.net/<dbname>?retryWrites=true&w=majority //You will need to configure an instance of mongoDB. You can use MongoDB Atlas.
```

The data model can be found in `./backend/models`.

#### Importing mock data

There is mock data that needs to be imported in order for some features to work (ex: Picks and Predictions)

To do this, you'll need mongoimport which is part of mongo-tools. (https://docs.mongodb.com/manual/reference/program/mongoimport/)

From the root folder of this project (where backend, frontend, and the doc folders are contained), run the following commands.

Local MongoDB Instance:

```
mongoimport --collection games --jsonArray --file backend/models/import_files/games.json
mongoimport --collection teams --jsonArray --file backend/models/import_files/teams.json
mongoimport --collection winners --jsonArray --file backend/models/import_files/winners.json
mongoimport --collection brackets --jsonArray --file backend/models/import_files/brackets.json
mongoimport --collection triviaquestions --jsonArray --file backend/models/import_files/triviaquestions.json
mongoimport --collection debatequestions --jsonArray --file backend/models/import_files/debate-questions.json
```

Atlas Instance:

```
mongoimport --uri "<connection_uri>" --collection games --jsonArray --file backend/models/import_files/games.json
mongoimport --uri "<connection_uri>" --collection teams --jsonArray --file backend/models/import_files/teams.json
mongoimport --uri "<connection_uri>" --collection winners --jsonArray --file backend/models/import_files/winners.json
mongoimport --uri "<connection_uri>" --collection brackets --jsonArray --file backend/models/import_files/brackets.json
mongoimport --uri "<connection_uri>" --collection triviaquestions --jsonArray --file backend/models/import_files/triviaquestions.json
mongoimport --uri "<connection_uri>" --collection debatequestions --jsonArray --file backend/models/import_files/debate-questions.json

# Ex: mongoimport --uri "mongodb+srv://username:password@cluster0.4n4cu.mongodb.net/mydb" --collection winners --jsonArray --file backend/models/import_files/winners.json
```

**If you need help with this or would like to use a populated database instance please contact any of the contributors on discord.**

### Front End Setup

1. `cd frontend`
2. `npm install`
3. `npm run start`

Since this project was created using [`create-react-app`](https://create-react-app.dev/) more information can be found in `./frontend/README.md`.
