import React from "react";
import { LeftPanelComponent } from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";
import { addNote } from './../../Config/Mutation';
import { NoteAction } from "./../../store/actions";
import { connect } from "react-redux";
import { CreateNoteModal } from './../../Component/createNoteModal';
import { AppSync } from './../../Config/graphql-config';
import { v4 as uuidv4 } from 'uuid';
class LeftPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      modalopen: false,
      title: "",
      content: ""
    }
  }

  setvalueonChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  CreateNote = () => {
    const { content, title } = this.state;
    const { user } = this.props;

    AppSync.mutate({
      variables: {
        input: {
          id: uuidv4(),
          note: content,
          noteTitle: title,
          user_id: user.sub,
          createdTimeStamp: new Date().getTime()
        }
      },
      mutation: addNote
    })
      .then(Response => console.log(Response))
      .catch(err => console.log(err))
  }
  render() {
    const { user } = this.props;
    const { modalopen, content, title } = this.state;
    console.log(content, title)
    return (
      <div>
        <CreateNoteModal
          modalopen={modalopen}
          handleClose={() => this.setState({ modalopen: false })}
          setvalueonChange={this.setvalueonChange}
          CreateNote={this.CreateNote}
        />
        <Query query={getNotebyUser_id} variables={{ user_id: user.sub }}>
          {({ data, error }) => {
            return (
              <LeftPanelComponent
                data={data}
                selected_note={this.props.selected_note}
                openModalFunction={() => this.setState({ modalopen: true })}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    selected_note: payload => {
      dispatch(NoteAction.selected_note(payload));
    }
  };
};

// const mapStateToProp = state => {
//   let { RouteReducer } = state;
//   console.log(RouteReducer);
//   return {
//     user: RouteReducer.user
//   };
// };

export default connect(null, mapDispatchToProp)(LeftPanel);
