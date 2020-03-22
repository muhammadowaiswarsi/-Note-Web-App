import gql from "graphql-tag";

const addNote = gql`
mutation addNote($input: AddNote){
         addNote(input: $input){
            id
            note
            noteTitle
            user_id
            createdTimeStamp
            upatedTimeStamp
    }   
}`;

const deleteNote = gql`
mutation deleteNote($id: ID!, $createdTimeStamp: String!){
         deleteNote(id: $id, createdTimeStamp: $createdTimeStamp){
            id
	        note
	        noteTitle
	        
    }
}`;

const updateNote = gql`
mutation updateNote($input: UpdateNote){
        updateNote(input: $input){
            id
            note
            noteTitle
            createdTimeStamp
        }
    }
`;

export { addNote, deleteNote, updateNote };
