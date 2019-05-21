import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ username }) => (
  <nav class="NavContainer">
    <div>
      <img
        src="https://github.com/normwarren/i-video/blob/master/DoItYourself-icon.png?raw=true"
        alt="DIY-icon"
        class="nav-icon"
      />
      Categories
    </div>
    <ul class="Nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
    </ul>
    {username && <div>Welcome, {username}</div>}
  </nav>
);

export default Navbar;
