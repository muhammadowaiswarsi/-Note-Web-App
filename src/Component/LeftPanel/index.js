import React from "react";
import "./index.css";

export const LeftPanelComponent = ({ data, openModalFunction, selected_note, toogle, onClose }) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>

        <div className="flex-center note-head" onClick={openModalFunction}>
          <h2>New Note</h2>
        </div>
        {toogle ? <span onClick={onClose}>X</span> : null}
      </div>
      <div>
        {data?.getNotebyUser_id &&
          data.getNotebyUser_id.length ?
          data.getNotebyUser_id.map((item, index) => {
            return (
              <p
                className="noteTitle"
                onClick={() => selected_note(item)}
                key={index}
              >
                {item.noteTitle}
              </p>
            );
          })
          : <div className="no-exist">No Notes</div>
        }
      </div>
    </div>
  );
}





