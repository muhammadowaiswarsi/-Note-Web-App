import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import "./index.css";
import { connect } from "react-redux";
import RouteAction from "../../store/actions/routeAction";
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
      storeData: [],
      toogle: false,
      rightpaneltoogle: false
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
    let { toogle, rightpaneltoogle } = this.state;
    const { user } = this.props
    return (
      <div className="MainContainer">
        <Row className="NavRow">
          <Navbar />
        </Row>
        <Row className="MainRow">
          <Col className={`leftPanelCol ${toogle ? 'collapsepanel' : "collapsepanel-off"} `} xl={2} md={2}>

            <LeftPanel user={user} toogle={toogle} onClose={() => this.setState({ toogle: false })} />
          </Col>
          <Col className="CenterPanelCol" xl={7} md={7} sm={12}>
            <Image src={require('./../../assets/icons/menu.png')} onClick={() => this.setState({ toogle: true, rightpaneltoogle: false })} />
            <CenterPanel />
            <Image className="rightpanelMenu" src={require('./../../assets/icons/menu.png')} onClick={() => this.setState({ rightpaneltoogle: true, toogle: false })} />

          </Col>
          <Col className={`RightPanelCol ${rightpaneltoogle ? 'collapsepanel' : "collapsepanel-off"} `} xl={3} md={3} >

            <RightPanel rightpaneltoogle={rightpaneltoogle} onClose={() => this.setState({ rightpaneltoogle: false })} />

          </Col>

          {/* <Dashboard logout={this.logout} loader={loader} /> */}
        </Row> 
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    authed: flag => {
      dispatch(RouteAction.authed(flag));
    }
  };
};

const mapStateToProp = state => {
  return {
    user: state.routeReducer.user
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(DashboardContainer);
