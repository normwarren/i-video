import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import router from "./router";
import { StripeProvider } from "react-stripe-elements";

function App() {
  return (
    <StripeProvider apiKey="pk_test_fM5dYb4uWUSp93kYKWT4PjXt00w1fIOqBJ">
      <Provider store={store}>
        <HashRouter>
          <Navbar />
          {router}
        </HashRouter>
      </Provider>
    </StripeProvider>
  );
}

export default App;
