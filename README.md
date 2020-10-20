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

**If you need help with this or would like to use a populated database instance please contact any of the contributors on discord.**

### Front End Setup

1. `cd frontend`
2. `npm install`
3. `npm run start`

Since this project was created using [`create-react-app`](https://create-react-app.dev/) more information can be found in `./frontend/README.md`.
