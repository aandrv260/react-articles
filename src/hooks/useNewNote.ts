import { useReducer } from 'react';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';

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
type ChangeEvent<T> = React.ChangeEvent<T>;

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
        heading: action.value || action.value === '' ? action.value : state.heading,
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
        description: action.value || action.value === '' ? action.value : state.description,
      };

    case 'CLEAR_FORM':
      return initialState;

    default:
      return state;
  }
};

const useNewNote = () => {
  const [form, dispatch] = useReducer(newNoteReducer, initialState);

  const headingChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE_HEADING', value: event.currentTarget.value });
  };

  const checkboxChangeHandler = () => {
    dispatch({ type: 'CHANGE_IS_FEATURED' });
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE_DESCRIPTION', value: event.currentTarget.value });
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatch({ type: 'CHANGE_TAGS', tags });
  };

  const clearFormHandler = () => {
    dispatch({ type: 'CLEAR_FORM' });
  };

  const multiSelectValue = form.tags?.map(tag => ({ label: tag.label, value: tag.id })) || [];

  return {
    newNoteForm: form,
    dispatchForm: dispatch,
    headingChangeHandler,
    checkboxChangeHandler,
    descriptionChangeHandler,
    tagsChangeHandler,
    clearFormHandler,
    multiSelectValue,
  };
};

export default useNewNote;
