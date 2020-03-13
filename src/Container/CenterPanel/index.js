import React from "react";
import { connect } from "react-redux";
import { CenterPanelComponent } from "./../../Component/CenterPanel";

class CenterPanel extends React.Component {
  render() {
    return <CenterPanelComponent selected_note={this.props.selected_note} />;
  }
}

const mapStateToProp = state => {
  let { NoteReducer } = state;
  return {
    selected_note: NoteReducer.selected_note
  };
};

export default connect(mapStateToProp, null)(CenterPanel);
