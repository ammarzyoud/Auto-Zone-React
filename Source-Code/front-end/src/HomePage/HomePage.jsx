import React from "react";
import { connect } from "react-redux";
import NavBar from "../NavBar/Navbar";
import Test from "./test";
import Slider from "../Slider/Slider";
import FilterNav from "../FilterNav/FilterNav";

export default class HomePage extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    localStorage.setItem("role", user.role);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <FilterNav />
        <Slider />
        <h1>Home Page</h1>
        <Test />
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const connectedHomePage = connect(mapState)(HomePage);
export { connectedHomePage as HomePage };
