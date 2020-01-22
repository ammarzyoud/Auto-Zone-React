import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { PrivateRoute_A } from "../Private_Admin_route/PrivateRoute_A";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { Profile } from "../Profile/Profile";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { Cart } from "../Cart/Cart";
import { Favorites } from "../Favorites/Favorites";
import Accessories from "../Categories/Accessories";
import Audio from "../Categories/Audio";
import Body from "../Categories/Body";
import Exterior from "../Categories/Exterior";
import Interior from "../Categories/Interior";
import Preformance from "../Categories/Preformance";
import Edit from "../AdminDashboard/Edit";

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <div>
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/Profile" component={Profile} />
              <PrivateRoute exact path="/Cart" component={Cart} />
              <PrivateRoute exact path="/Favorites" component={Favorites} />
              <PrivateRoute exact path="/Accessories" component={Accessories} />
              <PrivateRoute exact path="/Body" component={Body} />
              <PrivateRoute exact path="/Exterior" component={Exterior} />
              <PrivateRoute exact path="/Interior" component={Interior} />
              <PrivateRoute exact path="/Preformance" component={Preformance} />
              <PrivateRoute exact path="/Audio" component={Audio} />
              <PrivateRoute exact path="/Edit" component={Edit} />
              <PrivateRoute_A
                exact
                path="/AdminDashboard"
                component={AdminDashboard}
              />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
