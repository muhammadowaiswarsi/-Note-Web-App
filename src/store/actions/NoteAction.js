import { SELECTED_NOTE } from "../constant";

export default class NoteAction {
  static selected_note(payload) {
    return {
      type: SELECTED_NOTE,
      payload
    };
  }
}
