import React from "react";
import Signup from "../../Component/signup";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteAction } from "./../../store/actions/index";
// import { isLoggedIn } from "./../../Service/AuthService";
import { signup } from "./../../Service/AuthService";
import { Error } from "./../../Shared/Error";
import "./index.css";

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      error: ""
    };
  }

  signUpFunc = obj => {
    if (obj.password === obj.confirmPassword) {
      this.setState({
        loader: true
      });
      signup(obj)
        .then(res => {
          obj.user_id = res.user_id;
          this.props.user(obj);
          this.props.confirmRoute(true);
          this.setState({
            loader: false
          });
          setTimeout(() => {
            this.props.history.replace(`/confirmation`);
          }, 100);
        })
        .catch(err => {
          this.setState({
            loader: false,
            error: err.message
          });
          console.log(err);
        });
    } else {
      this.setState({
        error: "password is not matched"
      });
    }
  };

  submit = obj => {
    let {
      name,
      email,
      birthdate,
      city,
      state,
      country,
      area_code,
      password,
      confirmPassword
    } = obj;
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      birthdate &&
      city &&
      area_code &&
      state &&
      country
    ) {
      this.signUpFunc(obj);
    } else {
      this.setState({
        error: "please fill up all fields"
      });
    }
  };

  componentDidMount() {
    // isLoggedIn()
    //   .then(res => {
    //     if (res.attributes.sub) {
    //       localStorage.setItem("user", JSON.stringify(res.attributes));
    //       let user = res.attributes;
    //       let obj = {
    //         user_id: user.sub,
    //         name: user.name
    //       };
    //       this.props.user(obj);
    //       setTimeout(() => {
    //         this.props.authed(false);
    //       }, 100);
    //       this.props.history.replace(`/dashboard`);
    //     }
    //   })
    //   .catch(err => {
    //     this.props.authed(false);
    //     this.props.history.replace("/login");
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div className="SignupContainer flex-center-center">
        <Col className="main_col flex-center" xs={12} md={10} xl={10}>
          <Error errMessage={this.state.error} />
          <Signup
            history={this.props.history}
            submit={this.submit}
            loader={this.state.loader}
          />
        </Col>
      </div>
    );
  }
}

const dispatchToProp = dispatch => {
  return {
    confirmRoute: payload => {
      dispatch(RouteAction.confirm_route(payload));
    },
    authed: flag => {
      dispatch(RouteAction.authed(flag));
    },
    user: obj => {
      dispatch(RouteAction.user(obj));
    }
  };
};

export default connect(null, dispatchToProp)(SignupContainer);
