const express = require("express");
require("dotenv").config();
const app = express();
const massive = require("massive");
const session = require("express-session");
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;
const ctrl = require("./controller");

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

massive(CONNECTION_STRING).then(database => {
  app.set("db", database);
  console.log("database ready!");
  app.listen(SERVER_PORT, () =>
    console.log(`backend goodness is happening on ${SERVER_PORT}`)
  );
});
// AUTHENTICATION
app.get("/api/users", ctrl.getUsers);
app.post("/auth/register", ctrl.register);
app.post("/auth/login", ctrl.login);
app.get("/auth/details", ctrl.getDetails);
app.get("/auth/logout", ctrl.logout);
