import React, { Component } from "react";
import InputField from "./../../Shared/InputField";
import Button from "./../../Shared/Button";
import { Col, Row } from "react-bootstrap";
import "./index.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      birthdate: "",
      city: "",
      state: "",
      country: "",
      area_code: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
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
    } = this.state;
    let obj = {
      name,
      email,
      birthdate,
      city,
      state,
      country,
      area_code,
      password,
      confirmPassword
    };
    this.props.submit(obj);
  };

  render() {
    let {
      name,
      email,
      password,
      birthdate,
      city,
      state,
      country,
      area_code,
      confirmPassword
    } = this.state;

    let { loader } = this.props;
    return (
      <form onSubmit={this.submit}>
        <Row>
          <Col md={6}>
            <InputField
              name="name"
              label="Name"
              type="text"
              placeholder="John.."
              value={name}
              onChange={e => this.handleChange(e)}
            />
          </Col>

          <Col md={6}>
            <InputField
              name="birthdate"
              value={birthdate}
              label="Date of Birth"
              type="date"
              placeholder="YYYY-MM-DD"
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputField
              name="country"
              value={country}
              label="Country"
              type="text"
              placeholder=""
              onChange={e => this.handleChange(e)}
            />
          </Col>

          <Col md={3}>
            <InputField
              name="city"
              value={city}
              label="City"
              type="text"
              placeholder=""
              onChange={e => this.handleChange(e)}
            />
          </Col>

          <Col md={3}>
            <InputField
              name="state"
              value={state}
              label="State"
              type="text"
              placeholder=""
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputField
              name="area_code"
              value={area_code}
              label="Area Code"
              type="text"
              placeholder=""
              onChange={e => this.handleChange(e)}
            />
          </Col>

          <Col md={6}>
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Student@Yale.edu"
              value={email}
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputField
              name="password"
              value={password}
              label="Password"
              type="password"
              placeholder="Password2345#"
              onChange={e => this.handleChange(e)}
            />
          </Col>

          <Col md={6}>
            <InputField
              name="confirmPassword"
              value={confirmPassword}
              label="Confirm Password"
              type="password"
              placeholder=""
              onChange={e => this.handleChange(e)}
            />
          </Col>
        </Row>

        <div className="flex-between loginAndSignupBtn">
          <Button
            onClick={() => this.props.history.push("/login")}
            title="Login"
          />
          <Button type="submit" title="Register" loader={loader} />
        </div>
      </form>
    );
  }
}

export default Signup;
