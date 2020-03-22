import React from "react";
import "./index.css";
import { DropdownButton, Dropdown } from 'react-bootstrap'
export const LeftPanelComponent = ({ data, openModalFunction, selected_note, toogle, onClose, acsending, changeSorting }) => {
  console.log("data.getNotebyUser_id", data)
  //  data = isReverse ? data?.getNotebyUser_id?.reverse() : data?.getNotebyUser_id
  const array = acsending ? data?.sort() : data?.reverse()
  // let myNumericArray = [4, 1, 3, 2];
  // myNumericArray.sort();     // output is [1, 2, 3, 4]
  // myNumericArray.reverse();  // output is [4, 3, 2, 1]
  return (
    <div>
      <div style={{ display: 'flex' }}>

        <div className="flex-center note-head" onClick={openModalFunction}>
          <h2>New Note</h2>
        </div>
        {toogle ? <span onClick={onClose}>X</span> : null}
      </div>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item onSelect={(e) => changeSorting(e)} eventKey="Ascending">Ascending</Dropdown.Item>
        <Dropdown.Item onSelect={(e) => changeSorting(e)} eventKey="Descending">Descending</Dropdown.Item>
      </DropdownButton>
      <div>{
      }

        {array?.length ?
          array.map((item, index) => {
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





