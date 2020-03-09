import gql from "graphql-tag";

const addNote = gql`
    addNote($AddNote: AddNote){
        addNote(AddNote: $AddNote )
            id
	        note
	        noteTitle
	        user_id
	        createdTimeStamp
    }
}`;

const delteNote = gql`
    addNote($id: ID!, $createdTimeStamp: String!){
        addNote(id: $id, createdTimeStamp: $createdTimeStamp)
            id
	        note
	        noteTitle
	        user_id
	        createdTimeStamp
    }
}`;

const updateNote = gql`
    updateNote($UpdateNote: UpdateNote){
        updateNote(UpdateNote: $UpdateNote){
            id
            note
            noteTitle
            user_id
            createdTimeStamp
        }
    }
`;

export { addNote, delteNote, updateNote };
