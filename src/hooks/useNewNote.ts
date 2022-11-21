import { useReducer } from 'react';
import { NoteTagInfo } from '../models/noteTags';

interface NewNoteState {
  title: string;
  checkboxIsChecked: boolean;
  description: string;
  tags: NoteTagInfo[];
}

type ActionType =
  | 'CHANGE_TITLE'
  | 'CHANGE_CHECKBOX_STATE'
  | 'CHANGE_TAGS'
  | 'CHANGE_DESCRIPTION'
  | 'CLEAR_FORM';

interface NewNoteAction {
  type: ActionType;
  value?: string;
  tags?: NoteTagInfo[];
}

type FormReducer = (state: NewNoteState, action: NewNoteAction) => NewNoteState;

const initialState: NewNoteState = {
  title: '',
  checkboxIsChecked: false,
  description: '',
  tags: [],
};

const newNoteReducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return {
        ...state,
        title: action.value ? action.value : state.title,
      };

    case 'CHANGE_CHECKBOX_STATE':
      return {
        ...state,
        checkboxIsChecked: !state.checkboxIsChecked,
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
    createNoteForm: state,
    dispatchForm: dispatch,
  };
};

export default useNewNote;
