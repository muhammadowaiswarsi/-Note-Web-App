import React from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import './index.css'
export const CenterPanelComponent = ({ selected_note, title, content, setvalueonChange, updateNote, deleteModalConfirmation, getSelectedText }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      < Row className="header-center" >
        <Col xl={8} md={8} sm={8} xs={8} style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <div className="flex-center input-title">
            <input disabled={selected_note?.id ? false : true} id="title" onChange={setvalueonChange} value={title} placeholder="Type Note Title..." />
          </div>
        </Col>
        <Col xl={4} md={4} sm={4} xs={4}>
          <div className="icon-div">
            <span className="icon-span icon-1" onClick={() => updateNote(selected_note.id)}>
              <Image src={require('./../../assets/icons/saveimage.png')} style={{ width: "25px", cursor: "pointer" }} />
            </span>
            <span className="icon-span" onClick={selected_note?.id ? deleteModalConfirmation : ""}>
              <Image src={require('./../../assets/icons/dustbin.png')} style={{ width: "25px", cursor: "pointer" }} />
            </span>
          </div>

        </Col>
      </Row >
      <Row className="content-body">
        <Col xl={12} md={12} sm={12} className="content-Row">
          <textarea disabled={selected_note?.id ? false : true} id="content" value={content} onChange={setvalueonChange} onMouseUp={getSelectedText} />
        </Col>
      </Row>

    </div >
  );
};
