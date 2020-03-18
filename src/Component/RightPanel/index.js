import React from "react";
import { Form, Button, Col } from 'react-bootstrap';
import './index.css';

export const RightPanelComponent = ({ selected_note, sendRequest, ApiResponse, endPoint, setvalueonChange, onClose, rightpaneltoogle }) => {
  console.log('selected_note', selected_note)
  return <div style={{ width: "100%" }}>
    <div style={{ display: 'flex' }}>
      {rightpaneltoogle ? <span onClick={onClose}>X</span> : null}
      <div className="flex-center feedback-head" >
        <h2>Feedback</h2>
      </div>
    </div>
    <div>
      <Form.Group >
        <Form.Label></Form.Label>
        <Form.Control type="text"
          placeholder="End Point..."
          value={endPoint}
          onChange={setvalueonChange} />
      </Form.Group>

      <Col lg={12} md={12} style={{ display: "flex", justifyContent: "flex-end" }}><Button variant={'secondary'} disabled={selected_note?.id ? false : true} style={{ background: "#1a7ce0", color: "#fff", fontWeight: "bold" }} onClick={sendRequest}>Send</Button></Col>
    </div>
    <Col lg={12} md={12} className="response-box">
      {JSON.stringify(ApiResponse)}
    </Col>
  </div>
}



