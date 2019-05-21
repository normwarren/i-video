import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Forms/Login";
import LoginForm from "./Components/Forms/LoginForm";
import RegisterForm from "./Components/Forms/RegisterForm";
import Details from "./Components/Profile/Details";
import Shop from "./Components/Shop/Shop";
import Video from "./Components/Shop/IVideos/Video";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/login"
      component={() => (
        <Login>
          <LoginForm />
          <RegisterForm />
        </Login>
      )}
    />
    <Route path="/info" component={Details} />
    <Route component={Shop} path="/shop" />
    <Route component={Video} path="/video" />
    <Route component={Cart} path="/cart" />
    <Route component={Checkout} path="/checkout" />
  </Switch>
);
