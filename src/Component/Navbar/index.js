import React from "react";
import { Button } from "react-bootstrap";
import "./index.css";
import { logout } from './../../Service/AuthService';

export const Navbar = ({ name, history, authed }) => {
  return (
    <div className="flex-between NavMainDiv MB10">
      <h4 className="welcome_head">Welcome {name}</h4>
      <Button
        className="logount_btn"
        variant="outline-secondary"
        onClick={() => { logout(); authed(false); history() }}
      //   loader={loader}
      >
        Logout
        </Button>
    </div>
  );
}



export default Navbar;
