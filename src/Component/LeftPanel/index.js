import React from "react";
import "./index.css";

class LeftPanel extends React.Component {
  render() {
    const {
      data: { getNotebyUser_id }
    } = this.props;
    return (
      <div>
        <div className="flex-center">
          <h2>New Note</h2>
        </div>
        <div>
          {getNotebyUser_id &&
            getNotebyUser_id.length &&
            getNotebyUser_id.map((item, index) => {
              return (
                <p
                  className="noteTitle"
                  onClick={() => this.props.selected_note(item)}
                >
                  {item.noteTitle}
                </p>
              );
            })}
        </div>
      </div>
    );
  }
}

export default LeftPanel;
