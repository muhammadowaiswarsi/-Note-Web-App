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
import { AppSync } from './../../Config/graphql-config';
import { deleteNote } from './../../Config/Mutation';
import { getNotebyUser_id } from './../../Config/Queries';


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      storeData: [],
      toogle: false,
      rightpaneltoogle: false,
      title: "",
      content: ""
    };
  }
  componentDidUpdate = (prevProps, prevState) => {
    return (this.props?.selected_note?.id !== prevProps?.selected_note?.id)
      ?
      this.setState({
        title: this.props?.selected_note?.noteTitle,
        content: this.props?.selected_note?.note,
      })
      :
      null
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
  deleteNote = (id) => {
    const { selected_note, user } = this.props;
    AppSync.mutate({
      variables: {
        id,
        createdTimeStamp: selected_note?.createdTimeStamp
      },
      mutation: deleteNote,
      refetchQueries: [{
        query: getNotebyUser_id,
        variables: { user_id: user.sub },
        fetchPolicy: "network-only",
      }]
    })
      .then(Response => {
        this.setState({
          title: "",
          content: "",
        })
      })
      .catch(err => console.log(err))
  }
  setvalueonChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  render() {
    let { toogle, rightpaneltoogle, title, content } = this.state;
    const { user, selected_note } = this.props
    return (
      <div className="MainContainer">
        <Row className="NavRow">
          <Navbar history={this.props.history}/>
        </Row>
        <Row className="MainRow">
          <Col className={`leftPanelCol ${toogle ? 'collapsepanel' : "collapsepanel-off"} `} xl={2} md={2}>

            <LeftPanel
              user={user}
              setvalueonChange={this.setvalueonChange}
              title={title}
              content={content}
              toogle={toogle}
              onClose={() => this.setState({ toogle: false , title: "",content: ""})} />
          </Col>

          <Col className="CenterPanelCol" xl={7} md={7} sm={12}>
            <Image src={require('./../../assets/icons/menu.png')} onClick={() => this.setState({ toogle: true, rightpaneltoogle: false })} />
            <CenterPanel user={user}
              setvalueonChange={this.setvalueonChange}
              deleteNote={this.deleteNote}
              title={title}
              content={content}
              fieldEmpty={this.fieldEmpty}
            />
            <Image className="rightpanelMenu" src={require('./../../assets/icons/menu.png')} onClick={() => this.setState({ rightpaneltoogle: true, toogle: false })} />

          </Col>
          <Col className={`RightPanelCol ${rightpaneltoogle ? 'collapsepanel' : "collapsepanel-off"} `} xl={3} md={3} >

            <RightPanel
              rightpaneltoogle={rightpaneltoogle}
              onClose={() => this.setState({ rightpaneltoogle: false })}
              title={title}
              content={content}
              selected_note={this.props.selected_note}
            />

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
    selected_note: state.NoteReducer.selected_note,
    user: state.routeReducer.user
  };

};

export default connect(mapStateToProp, mapDispatchToProp)(DashboardContainer);
