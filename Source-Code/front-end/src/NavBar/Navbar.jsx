import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default class Navbar extends Component {
  render() {
    return (
      <header id="mu-hero">
        <a class="scrollToTop" href="#">
          <i class="fa fa-angle-up"></i>
        </a>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light mu-navbar">
            <a className="navbar-brand mu-logo" href="index.html">
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Auto Zone
              </Link>
            </a>
            {/* <!-- <a className="navbar-brand mu-logo" href="index.html"><img src="assets/images/logo.png" alt="logo"></a> --> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fa fa-bars"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto mu-navbar-nav">
                <li className="nav-item">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/Profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/Cart"
                  >
                    Cart <i class="fa fa-shopping-cart"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/Favorites"
                  >
                    Favorites ❤
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/Profile"
                  >
                    Profile <i class="fa fa-user"></i>
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <a
                    className="dropdown-toggle"
                    href="blog.html"
                    role="button"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Blog
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="blog.html">
                      Blog Archive
                    </a>
                    <a className="dropdown-item" href="blog-single.html">
                      Blog Single
                    </a>
                  </div>
                </li> */}
                <li className="nav-item">
                  {" "}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/login"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const connectedNavBar = connect()(Navbar);
