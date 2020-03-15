import React from "react";
import { connect } from "react-redux";
import { CenterPanelComponent } from "./../../Component/CenterPanel";
import { AppSync } from './../../Config/graphql-config';
import { updateNote, deleteNote } from './../../Config/Mutation';
import { getNotebyUser_id } from './../../Config/Queries';
class CenterPanel extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', props)

    this.state = {
      noteTitle: props?.selected_note?.noteTitle,
      note: props?.selected_note?.note
    }
  }

  updateNote = (id) => {
    const { noteTitle, note } = this.state;
    const { selected_note } = this.props;
    AppSync.mutate({
      variables: {
        input: {
          note: note,
          noteTitle: noteTitle,
          id,
          createdTimeStamp: selected_note?.createdTimeStamp

        }
      },
      mutation: updateNote,
      refetchQueries: [{
        query: getNotebyUser_id,
        variables: { user_id: id },
        fetchPolicy: "network-only",
      }]
    })
      .then(Response => {
        this.setState({
        })
      })
      .catch(err => console.log(err))
  }
  deleteNote = (id) => {
    const { selected_note } = this.props;
    AppSync.mutate({
      variables: {
        id,
        createdTimeStamp: selected_note?.createdTimeStamp
      },
      mutation: deleteNote,
      refetchQueries: [{
        query: getNotebyUser_id,
        variables: { user_id: id },
        fetchPolicy: "network-only",
      }]
    })
      .then(Response => {
        this.setState({
          note: "",
          noteTitle: "",
        })
      })
      .catch(err => console.log(err))
  }
  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevProps.selected_note)
    console.log(this.props.selected_note)
    return (this.props?.selected_note?.id !== prevProps?.selected_note?.id)
      ?
      this.setState({
        note: this.props?.selected_note?.note,
        noteTitle: this.props?.selected_note?.noteTitle,
      })
      :
      null
  }
  setvalueonChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    const { noteTitle, note } = this.state;
    console.log(noteTitle, note)
    return (
      <CenterPanelComponent
        selected_note={this.props.selected_note}
        noteTitle={noteTitle}
        note={note}
        setvalueonChange={this.setvalueonChange}
        updateNote={this.updateNote}
        deleteNote={this.deleteNote}
      />
    )
  }
}

const mapStateToProp = state => {
  let { NoteReducer } = state;
  return {
    selected_note: NoteReducer.selected_note
  };
};

export default connect(mapStateToProp, null)(CenterPanel);
