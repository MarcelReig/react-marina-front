import React from "react";

import { NavLink } from "react-router-dom";

const NavigationComponent = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <NavLink exact to="/" className="brand">
          Marina
        </NavLink>
      </div>
      <div className="right-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/about" activeClassName="nav-link-active">
            Sobre mí
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contacto
          </NavLink>
        </div>

        {/* Manten esto para desarollo - eliminalo para produción */}
        {/* <div className="nav-link-wrapper">
          <NavLink to="/portfolio-manager" activeClassName="nav-link-active">
            Dashboard
          </NavLink>
        </div> */}

        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/portfolio-manager", "Portfolio Manager")
          : null}
      </div>
    </div>
  );
};

export default NavigationComponent;
