import React from "react";
import "./index.css";

export const LeftPanelComponent = ({ data, openModalFunction }) => {
  return (
    <div>
      <div className="flex-center note-head" onClick={openModalFunction}>
        <h2>New Note</h2>
      </div>
      <div>
        {data?.getNotebyUser_id &&
          data.getNotebyUser_id.length &&
          data.getNotebyUser_id.map((item, index) => {
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





