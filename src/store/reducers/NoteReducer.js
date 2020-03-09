import { SELECTED_NOTE } from "../constant";

const initialState = {
  selected_note: {}
};

export default function NoteReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_NOTE:
      return {
        ...state,
        selected_note: action.payload
      };
    default:
      return state;
  }
}
