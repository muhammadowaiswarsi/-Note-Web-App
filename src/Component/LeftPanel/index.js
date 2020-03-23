import React from "react";
import "./index.css";
export const LeftPanelComponent = ({
  loading,
  data,
  selected_note,
}) => {
  return (
    <div>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : data?.length ? (
          data.map((item, index) => {
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
        ) : (
          <div className="no-exist">No Notes</div>
        )}
      </div>
    </div>
  );
};
