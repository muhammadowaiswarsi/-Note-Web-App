import React from "react";

export const CenterPanelComponent = ({ selected_note }) => {
  console.log(selected_note, "asdfadsf")
  return (
    <div>
      <div className="flex-center">
        <input value={selected_note.noteTitle} />
      </div>
      <textarea value={selected_note.note} />
    </div>
  );
};
