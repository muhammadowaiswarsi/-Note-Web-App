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
      acsending: false,
    }
  }

  changeSorting = (sorting) => {
    console.log('sorting', sorting)
    this.setState({
      acsending: sorting === "Descending" ? true : false
    })
  }

  CreateNote = () => {
    const { user, title, content, onClose } = this.props;
    console.log(user, title, content)
    AppSync.mutate({
      variables: {
        input: {
          note: content,
          noteTitle: title,
          user_id: user.sub,
          createdTimeStamp: new Date().getTime().toString(),
          upatedTimeStamp: new Date().getTime().toString()
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
    const { modalopen, acsending } = this.state;
    console.log('acsending', acsending)
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
                data={data?.getNotebyUser_id}
                selected_note={this.props.selected_note}
                openModalFunction={() => this.setState({ modalopen: true })}
                toogle={toogle}
                onClose={onClose}
                changeSorting={this.changeSorting}
                acsending={acsending}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}
// acsending ? data?.getNotebyUser_id?.reverse() : data?.getNotebyUser_id?.reverse()
const mapDispatchToProp = dispatch => {
  return {
    selected_note: payload => {
      dispatch(NoteAction.selected_note(payload));
    }
  };
};

export default connect(null, mapDispatchToProp)(LeftPanel);
