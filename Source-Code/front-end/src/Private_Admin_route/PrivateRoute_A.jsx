import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute_A = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("user") &&
        localStorage.getItem("role") == "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const connectedPrivateRoute_A = connect()(PrivateRoute_A);
export { connectedPrivateRoute_A as PrivateRoute_A };
