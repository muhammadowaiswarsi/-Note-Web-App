import React from "react";
import { LeftPanelComponent } from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";
import { addNote } from './../../Config/Mutation';
import { NoteAction } from "./../../store/actions";
import { connect } from "react-redux";
import { CreateNoteModal } from './../../Component/createNoteModal';
import { AppSync } from './../../Config/graphql-config';
class LeftPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      modalopen: false,

    }
  }



  CreateNote = () => {
    const { user, title, content ,onClose} = this.props;
    console.log(user, title, content)
    AppSync.mutate({
      variables: {
        input: {
          note: content,
          noteTitle: title,
          user_id: user.sub,
          createdTimeStamp: new Date().getTime().toString()
        }
      },
      mutation: addNote,
      refetchQueries: [{
        query: getNotebyUser_id,
        variables: { user_id: user.sub }
      }]
    })
      .then(Response => {
        this.setState({
          content: "",
          title: "",
          modalopen: false,
        })
        onClose();
      })
      .catch(err => console.log(err))
  }
  render() {
    const { user, toogle, onClose, setvalueonChange } = this.props;
    const { modalopen } = this.state;
    return (
      <div>
        <CreateNoteModal
          modalopen={modalopen}
          handleClose={() => this.setState({ modalopen: false })}
          setvalueonChange={setvalueonChange}
          CreateNote={this.CreateNote}
        />
        <Query query={getNotebyUser_id} variables={{ user_id: user.sub }} fetchPolicy="network-only">
          {({ data, error }) => {
            return (
              <LeftPanelComponent
                data={data}
                selected_note={this.props.selected_note}
                openModalFunction={() => this.setState({ modalopen: true })}
                toogle={toogle}
                onClose={onClose}
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
