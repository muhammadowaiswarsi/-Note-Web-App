import React from "react";
import { LeftPanelComponent } from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";
import { addNote } from "./../../Config/Mutation";
import { NoteAction } from "./../../store/actions";
import { connect } from "react-redux";
import { CreateNoteModal } from "./../../Component/createNoteModal";
import { AppSync } from "./../../Config/graphql-config";
class LeftPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      modalopen: false,
      acsending: true,
      sorting: "Ascending"
    };
  }

  changeSorting = sorting => {
    this.setState({
      acsending: sorting === "Descending" ? true : false
    });
    if (sorting === "Ascending") {
      this.setState({ sorting: "Descending", acsending: false });
    } else if (sorting === "Descending") {
      this.setState({ sorting: "Ascending", acsending: true });
    }
  };

  sortAscending = data =>
    data.sort((a, b) => a.upatedTimeStamp - b.upatedTimeStamp);

  sortDescending = data =>
    data.sort((a, b) => b.upatedTimeStamp - a.upatedTimeStamp);

  CreateNote = () => {
    const { user, title, content, onClose } = this.props;
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
      refetchQueries: [
        {
          query: getNotebyUser_id,
          variables: { user_id: user.sub }
        }
      ]
    })
      .then(Response => {
        this.setState({
          content: "",
          title: "",
          modalopen: false
        });
        onClose();
      })
      .catch(err => console.log(err));
  };
  render() {
    const { user, toogle, onClose, setvalueonChange } = this.props;
    const { modalopen, acsending, sorting } = this.state;
    console.log(sorting, "sorting");
    return (
      <div>
        <CreateNoteModal
          modalopen={modalopen}
          handleClose={() => this.setState({ modalopen: false })}
          setvalueonChange={setvalueonChange}
          CreateNote={this.CreateNote}
        />
        <Query
          query={getNotebyUser_id}
          variables={{ user_id: user.sub }}
          fetchPolicy="network-only"
        >
          {({ data, loading }) => {
            let array = data?.getNotebyUser_id ? data.getNotebyUser_id : [];
            return (
              <LeftPanelComponent
                data={
                  acsending
                    ? this.sortAscending(array)
                    : this.sortDescending(array)
                }
                selected_note={this.props.selected_note}
                openModalFunction={() => this.setState({ modalopen: true })}
                toogle={toogle}
                onClose={onClose}
                changeSorting={this.changeSorting}
                acsending={acsending}
                sorting={sorting}
                loading={loading}
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

export default connect(null, mapDispatchToProp)(LeftPanel);
