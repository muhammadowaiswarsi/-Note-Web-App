import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginContainer from "../Container/Login";
import DashboardContainer from "../Container/Home";
import SignupConfirmation from "../Container/SignupConfirmation";
import SignupContainer from "../Container/Signup";
import { connect } from "react-redux";
import RouteAction from "../store/actions/RouteAction";
import Loading from "./../Container/LoaderScreen";
import { isLoggedIn } from "./../Service/AuthService";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmRoute: false,
      authed: false
    };
  }

  componentDidMount() {
    console.log("login container");
    isLoggedIn()
      .then(res => {
        if (res.attributes.sub) {
          const user = res.attributes;
          this.props.user(user);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authed !== this.props.authed) {
      this.setState({
        authed: this.props.authed
      });
    }
    if (prevProps.confirmRoute !== this.props.confirmRoute) {
      this.setState({
        confirmRoute: this.props.confirmRoute
      });
    }
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Loading} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/registration" component={SignupContainer} />
        <PrivateRoute
          exact
          authed={this.state.confirmRoute}
          path="/confirmation"
          component={SignupConfirmation}
        />
        <PrivateRoute
          exact
          authed={this.state.authed}
          path="/dashboard"
          component={DashboardContainer}
        />
      </Router>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    user: payload => {
      dispatch(RouteAction.user(payload));
    },
  };
};

const mapStateToProp = state => {
  let { routeReducer } = state;
  return {
    authed: routeReducer.authed,
    confirmRoute: routeReducer.confirmRoute
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Routes);
