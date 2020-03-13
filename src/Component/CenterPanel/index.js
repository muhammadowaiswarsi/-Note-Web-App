import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import './index.css'
export const CenterPanelComponent = ({ selected_note }) => {
  console.log(selected_note, "asdfadsf")
  return (
    <div>
      <Row className="header-center">
        <Col xl={8} md={8} sm={8} style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <div className="flex-center input-title">
            <input value={selected_note.noteTitle} />
          </div>
        </Col>
        <Col xl={4} md={4} sm={4}>
          <div className="icon-div">
            <span className="icon-span icon-1">
              <Image src={require('./../../assets/icons/saveimage.png')} style={{ width: "25px" }} />
            </span>
            <span className="icon-span">
              <Image src={require('./../../assets/icons/dustbin.png')} style={{ width: "25px" }} />
            </span>
          </div>

        </Col>
      </Row>
      <textarea value={selected_note.note} />
    </div>
  );
};
