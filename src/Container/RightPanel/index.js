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
    fetch(endPoint,
      {
        mode: 'cors'
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          ApiResponse: data
        })
      });
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
