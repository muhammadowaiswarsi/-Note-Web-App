import React from "react";
import { LeftPanelComponent } from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";
import { addNote } from "./../../Config/Mutation";
import { NoteAction } from "./../../store/actions";
import { connect } from "react-redux";
import { CreateNoteModal } from "./../../Component/createNoteModal";
import { AppSync } from "./../../Config/graphql-config";
import { DropdownButton, Dropdown } from "react-bootstrap";

class LeftPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      modalopen: false,
      sorting: "Ascending"
    };
  }

  changeSorting = sorting => {
    this.setState({
      sorting
    })
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
    const { modalopen, sorting } = this.state;
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
              <div>
                <div style={{ display: "flex" }}>
                  <div className="flex-center note-head" onClick={() => this.setState({ modalopen: true })}>
                    <h2>New Note</h2>
                  </div>
                  {toogle ? <span onClick={onClose}>X</span> : null}
                </div>
                <DropdownButton id="dropdown-basic-button" title={sorting}>
                  <Dropdown.Item onSelect={e => this.changeSorting(e)} eventKey="Ascending">
                    Ascending
        </Dropdown.Item>
                  <Dropdown.Item onSelect={e => this.changeSorting(e)} eventKey="Descending">
                    Descending
        </Dropdown.Item>
                </DropdownButton>
                <LeftPanelComponent
                  data={
                    sorting === 'Ascending'
                      ? this.sortAscending(array)
                      : this.sortDescending(array)
                  }
                  selected_note={this.props.selected_note}
                  loading={loading}
                />
              </div>
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
