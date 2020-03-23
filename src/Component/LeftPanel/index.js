import React from "react";
import "./index.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
export const LeftPanelComponent = ({
  loading,
  data,
  openModalFunction,
  selected_note,
  toogle,
  onClose,
  changeSorting,
  sorting
}) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="flex-center note-head" onClick={openModalFunction}>
          <h2>New Note</h2>
        </div>
        {toogle ? <span onClick={onClose}>X</span> : null}
      </div>
      <DropdownButton id="dropdown-basic-button" title={sorting}>
        <Dropdown.Item onSelect={e => changeSorting(e)} eventKey="Ascending">
          Ascending
        </Dropdown.Item>
        <Dropdown.Item onSelect={e => changeSorting(e)} eventKey="Descending">
          Descending
        </Dropdown.Item>
      </DropdownButton>
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
