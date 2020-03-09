import React from "react";

class CenterPanel extends React.Component {
  render() {
    const { selected_note } = this.props;
    return !(selected_note && selected_note.note) ? (
      <div className="flex-center">
        <h2>Select Any Note</h2>
      </div>
    ) : (
      <div>
        <div className="flex-center">
          <h2>{selected_note.noteTitle}</h2>
        </div>
        <p>{selected_note.note}</p>
      </div>
    );
  }
}

export default CenterPanel;
