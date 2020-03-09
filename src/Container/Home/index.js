import React from "react";
import Dashboard from "../../Component/Home";
import { Col, Row } from "react-bootstrap";
import "./index.css";
import { connect } from "react-redux";
import routeAction from "../../store/actions/routeAction";
import { logout } from "../../Service/AuthService";
import LeftPanel from "./../LeftPanel";
import CenterPanel from "./../CenterPanel";
import RightPanel from "./../RightPanel";
import Navbar from "./../Navbar";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      storeData: []
    };
  }

  logout = () => {
    this.setState({
      loader: true
    });
    logout()
      .then(res => {
        this.setState({
          loader: false
        });
        this.props.authed(false);
        this.props.history.replace("/login");
      })
      .catch(err => {
        this.setState({
          loader: false
        });
        console.log(err);
      });
  };

  render() {
    let { loader } = this.state;
    return (
      <div className="MainContainer">
        <Row className="NavRow">
          <Navbar />
        </Row>
        <Row className="MainRow">
          <Col className="leftPanelCol" xl={2} md={2} sm={12}>
            <LeftPanel />
          </Col>
          <Col className="CenterPanelCol" xl={7} md={7} sm={12}>
            <CenterPanel />
          </Col>
          <Col className="RightPanelCol" xl={3} md={3} sm={12}>
            <RightPanel />
          </Col>
        </Row>
        {/* <Dashboard logout={this.logout} loader={loader} /> */}
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    authed: flag => {
      dispatch(routeAction.authed(flag));
    }
  };
};

const mapStateToProp = state => {
  return {
    user: state.routeReducer.user
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(DashboardContainer);
