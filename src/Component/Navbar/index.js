import React from "react";
import { Button } from "react-bootstrap";
// import Button from "./../../Shared/Button";
import "./index.css";

class Navbar extends React.Component {
  render() {
    return (
      <div className="flex-between NavMainDiv MB10">
        <span className="welcome_head MB30">Welcome Owais</span>
        <Button
          className="logount_btn"
          variant="outline-secondary"
          onClick={() => this.props.logout()}
          //   loader={loader}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default Navbar;
