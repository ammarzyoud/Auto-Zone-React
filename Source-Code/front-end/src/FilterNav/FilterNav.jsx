import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FilterNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <div className="row w-100">
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Accessories">
                Accessories
              </Link>
            </div>
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Interior">
                Interior
              </Link>
            </div>
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Exterior">
                Exterior
              </Link>
            </div>
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Body">
                Body
              </Link>
            </div>
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Preformance">
                Preformance
              </Link>
            </div>
            <div className="col-sm">
              <Link style={{ color: "Grey" }} to="/Audio">
                Audio
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
