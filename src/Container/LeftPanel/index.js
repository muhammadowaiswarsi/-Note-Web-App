import React from "react";
import LeftPanelComponent from "./../../Component/LeftPanel";
import { Query } from "react-apollo";
import { getNotebyUser_id } from "./../../Config/Queries";

class LeftPanel extends React.Component {
  render() {
    return (
      <Query query={getNotebyUser_id} variables={{ user_id: "3r23rwerwer" }}>
        {({ data, error }) => {
          return <LeftPanelComponent data={data} />;
        }}
      </Query>
    );
  }
}

export default LeftPanel;
