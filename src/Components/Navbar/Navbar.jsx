import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ username }) => (
  <nav class="NavContainer">
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
