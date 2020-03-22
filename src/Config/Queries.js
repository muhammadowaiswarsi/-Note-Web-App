import gql from "graphql-tag";

const getNoteByID = gql`
  query getNoteByID($id: ID!, $createdTimeStamp: String!) {
    getNoteByID(id: $id, createdTimeStamp: $createdTimeStamp) {
      id
      note
      noteTitle
      user_id
      createdTimeStamp
      upatedTimeStamp
    }
  }
`;

const getNotebyUser_id = gql`
  query getNotebyUser_id($user_id: ID!) {
    getNotebyUser_id(user_id: $user_id) {
      id
      note
      noteTitle
      user_id
      createdTimeStamp
    }
  }
`;

export { getNoteByID, getNotebyUser_id };
