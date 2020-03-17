import React from "react";
import { Form, Button } from 'react-bootstrap';
import './index.css';

export const RightPanelComponent = ({ sendRequest, ApiResponse, endPoint, setvalueonChange, onClose, rightpaneltoogle }) => {
  console.log(ApiResponse)
  return <div>
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
      <Button variant="primary" onClick={sendRequest}>Send</Button>

    </div>
  </div>
}



