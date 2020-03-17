import React from "react";
import { RightPanelComponent } from "./../../Component/RightPanel";


class RightPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      ApiResponse: {},
      endPoint: "",

    }

  }

  // https://jsonplaceholder.typicode.com/todos
  sendRequest = () => {
    const { endPoint } = this.state;
    const { title, content } = this.props


    const options = {
      method: 'POST',
      body: JSON.stringify({ noteTitle: title, note: content }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // send POST request
    fetch(endPoint, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          ApiResponse: res
        })
        console.log(res)
      })
      .catch((err) => console.log('err', err))
  }
  
  setvalueonChange = (event) => {
    this.setState({
      endPoint: event.target.value
    })
  }
  render() {
    const { ApiResponse, endPoint } = this.state;
    const { rightpaneltoogle, onClose } = this.props;
    return <RightPanelComponent
      ApiResponse={ApiResponse}
      sendRequest={this.sendRequest}
      setvalueonChange={this.setvalueonChange}
      endPoint={endPoint}
      rightpaneltoogle={rightpaneltoogle}
      onClose={onClose}

    />;
  }
}

export default RightPanel;
