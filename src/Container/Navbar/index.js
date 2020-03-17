import React from "react";
import NavbarComponent from "./../../Component/Navbar";
import { connect } from "react-redux";
import { RouteAction } from "./../../store/actions/index";

class Navbar extends React.Component {

  render() {
    return <NavbarComponent name={this.props.name} authed={this.props.authed} history={this.props.history} />;
  }
}

const dispatchToProp = dispatch => {
  return {
    user: obj => {
      dispatch(RouteAction.user(obj));
    },
    authed: (bool) => { dispatch(RouteAction.authed(bool)) },
  };
};

const mapStateToProp = state => {
  let { routeReducer } = state;
  return {
    name: routeReducer.user.name
  };
};

export default connect(mapStateToProp, dispatchToProp)(Navbar);
