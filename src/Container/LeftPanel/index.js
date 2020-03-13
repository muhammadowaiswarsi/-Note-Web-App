import React from "react";
import LeftPanelComponent from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";
import { NoteAction } from "./../../store/actions";
import { connect } from "react-redux";

class LeftPanel extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Query query={getNotebyUser_id} variables={{ user_id: user.sub }}>
        {({ data, error }) => {
          return (
            <LeftPanelComponent
              data={data}
              selected_note={this.props.selected_note}
            />
          );
        }}
      </Query>
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
