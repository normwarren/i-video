const express = require("express");
require("dotenv").config();
const app = express();
const massive = require("massive");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const {
  SESSION_SECRET,
  SERVER_PORT,
  CONNECTION_STRING
  //STRIPE_SECRET
} = process.env;
const authCtrl = require("./controllers/AuthController");
const videoCtrl = require("./controllers/videoController");
const cartCtrl = require("./controllers/cartController");
const checkoutCtrl = require("./controllers/checkoutController");

//MIDDLEWARES
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
app.use(checkForSession);

massive(CONNECTION_STRING).then(database => {
  app.set("db", database);
  console.log("database ready!");
  app.listen(SERVER_PORT, () =>
    console.log(`backend goodness is happening on ${SERVER_PORT}`)
  );
});
// AUTHENTICATION
app.get("/api/users", authCtrl.getUsers);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/details", authCtrl.getDetails);
app.get("/auth/logout", authCtrl.logout);
app.get("/api/user", authCtrl.getUser);

//VIDEOS
app.get("/api/videos", videoCtrl.getVideos);

//CART Endpoints
app.post("/api/cart/add", cartCtrl.addToCart);
app.get("/api/cart", cartCtrl.getCartById);
app.delete("/api/cart/remove", cartCtrl.removeFromCart);

//CHECKOUT
app.post("/api/checkout/charge", checkoutCtrl.charge);
// app.post("/api/cart/:id", cartCtrl.add);
// app.delete("/api/cart/:id", cartController.delete);
