const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Database connection successful!");
});

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const acsRouter = require("./routes/acs");
const userPicksRouter = require("./routes/user-picks");
const teamsRouter = require("./routes/team");
const winnersRouter = require("./routes/winners");
const postsRouter = require("./routes/posts");

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/acs", acsRouter);
app.use("/user-picks", userPicksRouter);
app.use("/team", teamsRouter);
app.use("/winners", winnersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
