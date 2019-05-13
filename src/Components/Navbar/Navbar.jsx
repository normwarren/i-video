import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ username }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
    {username && <div>Welcome, {username}</div>}
  </nav>
);

export default Navbar;
