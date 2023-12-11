import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> ReactJs
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/book">Books</NavLink>
      </nav>
    </header>
  );
}
