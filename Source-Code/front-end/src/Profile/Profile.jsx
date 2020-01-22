import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import NavBar from "../NavBar/Navbar";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in</p>
          <div style={{ display: user.role == "Admin" ? "block" : "none" }}>
            <button className="btn btn-success my-2 my-sm-0 ml-2">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="AdminDashboard"
              >
                Admin Dashboard
              </Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {
  getUsers: userActions.getAll
};

const connectedProfile = connect(mapState, actionCreators)(Profile);
export { connectedProfile as Profile };
