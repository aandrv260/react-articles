import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { changeValueToIdInTagsArr } from '../utils/tags';

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
      return initialState;

    default:
      return state;
  }
};

const useNewNote = () => {
  const [form, dispatch] = useReducer(newNoteReducer, initialState);
  const allTags = useSelector((state: NotesSlice) => state.allTags);
  const allTagsIdsToValueArr = changeValueToIdInTagsArr(allTags);

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

  const setNoteStatusToCreated = () => {
    dispatch({ type: 'SET_NOTE_CREATED' });
  };

  const feedbackVisibilityChangeHandler = (isVisible: boolean) => {
    dispatch({ type: 'SET_FEEDBACK_VISIBILITY', feedbackVisibility: isVisible });
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
    setNoteStatusToCreated,
    multiSelectValue,
    allTagsIdsToValueArr,
    feedbackVisibilityChangeHandler,
  };
};

export default useNewNote;
