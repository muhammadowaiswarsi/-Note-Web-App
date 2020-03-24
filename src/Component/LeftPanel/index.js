import React from "react";
import "./index.css";
export const LeftPanelComponent = ({
  loading,
  data,
  selected_note,
}) => {
  return (
    <div style={{ height: 'calc(100% - 133px)', display: 'flex' }}>
      <div style={{ overflowY: "auto", width: "100%",overflowX:"hidden" }} className="scroll-custom">
        {loading ? (
          <div>loading...</div>
        ) : data?.length ? (
          data.map((item, index) => {
            return (
              <p
                className="noteTitle trucate"
                onClick={() => selected_note(item)}
                key={index}
              >
                {item.noteTitle}
              </p>
            );
          })
        ) : (
              <div className="no-exist">No Notes</div>
            )}
      </div>
    </div>
  );
};
