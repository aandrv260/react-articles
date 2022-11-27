import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { TextareaChangeHandler } from '../models/form';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import generateId from '../utils/generateId';

type ActionType =
  | 'CHANGE_HEADING'
  | 'CHANGE_IS_FEATURED'
  | 'CHANGE_TAGS'
  | 'CHANGE_DESCRIPTION'
  | 'SET_NOTE_CREATED'
  | 'SET_FEEDBACK_VISIBILITY'
  | 'CLEAR_FORM';

interface NewNoteAction {
  type: ActionType;
  value?: string;
  feedbackVisibility?: boolean;
  tags?: NoteTagInfo[];
}

interface InitialCreateNoteState extends Note {
  isNoteCreated?: boolean;
  isFeedbackVisible?: boolean;
}

type FormReducer = (state: InitialCreateNoteState, action: NewNoteAction) => InitialCreateNoteState;
type ChangeEvent<T> = React.ChangeEvent<T>;

const initialState: InitialCreateNoteState = {
  heading: '',
  isFeatured: false,
  isNoteCreated: false,
  isFeedbackVisible: false,
  description: '',
  tags: [],
  id: generateId(),
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

    case 'SET_NOTE_CREATED':
      return {
        ...state,
        isNoteCreated: true,
      };

    case 'SET_FEEDBACK_VISIBILITY':
      return {
        ...state,
        isFeedbackVisible: !!action.feedbackVisibility,
      };

    case 'CLEAR_FORM':
      return {
        ...initialState,
        id: generateId(),
      };

    default:
      return state;
  }
};

const useNewNote = () => {
  const [form, dispatch] = useReducer(newNoteReducer, initialState);
  const allTags = useSelector((state: NotesSlice) => state.allTags);

  const headingChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE_HEADING', value: event.currentTarget.value });
  };

  const checkboxChangeHandler = () => {
    dispatch({ type: 'CHANGE_IS_FEATURED' });
  };

  const descriptionChangeHandler: TextareaChangeHandler = event => {
    dispatch({ type: 'CHANGE_DESCRIPTION', value: event.currentTarget.value });
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatch({ type: 'CHANGE_TAGS', tags });
  };

  const setNoteStatusToCreated = () => {
    dispatch({ type: 'SET_NOTE_CREATED' });
  };

  const changeFeedbackVisibility = (isVisible: boolean) => {
    dispatch({ type: 'SET_FEEDBACK_VISIBILITY', feedbackVisibility: isVisible });
  };

  const clearForm = () => {
    dispatch({ type: 'CLEAR_FORM' });
  };

  return {
    newNoteForm: form,
    dispatchForm: dispatch,
    headingChangeHandler,
    checkboxChangeHandler,
    descriptionChangeHandler,
    tagsChangeHandler,
    clearForm,
    setNoteStatusToCreated,
    allTags,
    changeFeedbackVisibility,
  };
};

export default useNewNote;
