import React from "react";
import { connect } from "react-redux";
import { CenterPanelComponent } from "./../../Component/CenterPanel";
import { AppSync } from './../../Config/graphql-config';
import { updateNote } from './../../Config/Mutation';
import { getNotebyUser_id } from './../../Config/Queries';
class CenterPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

  updateNote = (id) => {
    const { selected_note, user, title, content } = this.props;
    AppSync.mutate({
      variables: {
        input: {
          note: content,
          noteTitle: title,
          id,
          createdTimeStamp: selected_note?.createdTimeStamp

        }
      },
      mutation: updateNote,
      refetchQueries: [{
        query: getNotebyUser_id,
        variables: { user_id: user.sub },
        fetchPolicy: "network-only",
      }]
    })
      .then(Response => {
        this.setState({
        })
      })
      .catch(err => console.log(err))
  }
  
  // componentDidUpdate = (prevProps, prevState) => {
  //   return (this.props?.selected_note?.id !== prevProps?.selected_note?.id)
  //     ?
  //     this.setState({
  //       note: this.props?.selected_note?.note,
  //       noteTitle: this.props?.selected_note?.noteTitle,
  //     })
  //     :
  //     null
  // }


  render() {
    const { setvalueonChange,title, content , deleteNote} = this.props;
    return (
      <CenterPanelComponent
        selected_note={this.props.selected_note}
        title={title}
        content={content}
        setvalueonChange={setvalueonChange}
        updateNote={this.updateNote}
        deleteNote={deleteNote}

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
