import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationComponent = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);


  
  const dynamicLink = (route, linkText) => {
    return (
      <li className="nav-link-wrapper">
        <NavLink
          to={route}
          activeClassName="nav-link-active"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          {linkText}
        </NavLink>
      </li>
    );
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    props.history.push("/");
    props.handleSuccessfulLogout();
  };

  return (
    <div className="navigation">
      <NavLink exact to="/" className="brand-name">
        Marina
      </NavLink>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li className="nav-link-wrapper">
            <NavLink
              exact
              to="/"
              activeClassName="nav-link-active"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-link-wrapper">
            <NavLink
              to="/about"
              activeClassName="nav-link-active"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Sobre mí
            </NavLink>
          </li>
          <li className="nav-link-wrapper">
            <NavLink
              to="/shop"
              activeClassName="nav-link-active"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Tienda
            </NavLink>
          </li>
          <li className="nav-link-wrapper">
            <NavLink
              to="/contact"
              activeClassName="nav-link-active"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Contacto
            </NavLink>
          </li>

          {props.loggedInStatus === "LOGGED_IN"
            ? [
                dynamicLink("/portfolio-manager", "Portfolio Manager"),
                dynamicLink("/inventory-manager", "Inventory Manager"),
              ]
            : null}

          {props.loggedInStatus === "LOGGED_IN" ? (
            <a className="logout" onClick={handleSignOut}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </a>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
