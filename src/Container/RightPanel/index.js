import React from "react";
import { RightPanelComponent } from "./../../Component/RightPanel";


class RightPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      ApiResponse: "",
      endPoint: "",

    }

  }

  // https://jsonplaceholder.typicode.com/todos
  sendRequest = () => {

    const { endPoint } = this.state;
    const { title, content } = this.props
    console.log('endPoint', endPoint)

    const options = {
      method: 'POST',
      body: JSON.stringify({ note: content }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {

      // send POST request
      fetch(endPoint, options)
        .then(res => res.json())
        .then(res1 => {
          this.setState({
            ApiResponse: res1
          })
          console.log(res1)
        })
      // .catch((err) => this.setState({ ApiResponse: err }))
    }
    catch (err) {
      this.setState({ ApiResponse: err })
      throw err

    }
  }

  setvalueonChange = (event) => {
    this.setState({
      endPoint: event.target.value
    })
  }
  render() {
    const { ApiResponse, endPoint } = this.state;
    const { rightpaneltoogle, onClose, selected_note } = this.props;
    return <RightPanelComponent
      ApiResponse={ApiResponse}
      sendRequest={this.sendRequest}
      setvalueonChange={this.setvalueonChange}
      endPoint={endPoint}
      rightpaneltoogle={rightpaneltoogle}
      onClose={onClose}
      selected_note={selected_note}

    />;
  }
}

export default RightPanel;
