import React from "react";
import { Button } from "react-bootstrap";
import "./index.css";

class Navbar extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="flex-between NavMainDiv MB10">
        <h4 className="welcome_head">Welcome {name}</h4>
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
