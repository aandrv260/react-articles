import { useReducer } from 'react';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';

// interface NewNoteState {
//   heading: string;
//   isFeatured: boolean;
//   description: string;
//   tags: NoteTagInfo[];
// }

type ActionType =
  | 'CHANGE_HEADING'
  | 'CHANGE_IS_FEATURED'
  | 'CHANGE_TAGS'
  | 'CHANGE_DESCRIPTION'
  | 'CLEAR_FORM';

interface NewNoteAction {
  type: ActionType;
  value?: string;
  tags?: NoteTagInfo[];
}

type FormReducer = (state: Note, action: NewNoteAction) => Note;

const initialState: Note = {
  heading: '',
  isFeatured: false,
  description: '',
  tags: [],
};

const newNoteReducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_HEADING':
      return {
        ...state,
        heading: action.value ? action.value : state.heading,
      };

    case 'CHANGE_IS_FEATURED':
      return {
        ...state,
        isFeatured: !state.isFeatured,
      };

    case 'CHANGE_TAGS':
      return {
        ...state,
        tags: action.tags ? action.tags : state.tags,
      };

    case 'CHANGE_DESCRIPTION':
      return {
        ...state,
        description: action.value ? action.value : state.description,
      };

    // Add a clear form button
    case 'CLEAR_FORM':
      return initialState;

    default:
      return state;
  }
};

const useNewNote = () => {
  const [state, dispatch] = useReducer(newNoteReducer, initialState);

  return {
    newNoteForm: state,
    dispatchForm: dispatch,
  };
};

export default useNewNote;
