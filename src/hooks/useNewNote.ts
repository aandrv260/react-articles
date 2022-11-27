import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import {
  FormReducer,
  NoteFormState,
  InputChangeHandler,
  TagsChangeHandler,
  TextareaChangeHandler,
} from '../models/form';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import {
  entireFormIsValid,
  isFormDescriptionValid,
  isFormHeadingValid,
} from '../utils/formValidation';
import generateId from '../utils/generateId';

type ChangeEvent<T> = React.ChangeEvent<T>;

const noFeedback = {
  message: '',
  isVisible: false,
};

const initialState: NoteFormState = {
  heading: '',
  isFeatured: false,
  formIsValid: false,
  status: 'FORM_EMPTY',
  feedback: noFeedback,
  description: '',
  tags: [],
  id: generateId(),
};

const newNoteReducer: FormReducer = (state, action) => {
  const feedbackMessage = state.feedback.message.trim();
  let newFeedbackMessage = '';

  // console.log(stat)

  switch (action.type) {
    case 'CHANGE_HEADING': {
      const heading = action.value || state.heading;

      if (action.value !== undefined && !isFormHeadingValid(action.value)) {
        newFeedbackMessage = 'The heading must have >= 5 characters.';

        return {
          ...state,
          status: 'VALIDATION_ISSUE',
          formIsValid: false,
          feedback: {
            message: newFeedbackMessage,
            isVisible: true,
          },
          heading: action.value,
        };
      }

      return {
        ...state,
        status: 'IN_EDIT',
        formIsValid: entireFormIsValid({ heading, description: state.description }),
        feedback: noFeedback,
        heading,
      };
    }

    case 'CHANGE_IS_FEATURED':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        isFeatured: !state.isFeatured,
      };

    case 'CHANGE_TAGS':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        tags: action.tags || state.tags,
      };

    case 'CHANGE_DESCRIPTION': {
      const description = action.value || state.description;

      if (action.value !== undefined && !isFormDescriptionValid(action.value)) {
        return {
          ...state,
          status: 'VALIDATION_ISSUE',
          formIsValid: false,
          feedback: {
            message: 'Description must contain at least 20 characters.',
            isVisible: true,
          },
          description: action.value,
        };
      }

      return {
        ...state,
        description,
        status: 'IN_EDIT',
        formIsValid: entireFormIsValid({ heading: state.heading, description }),
        feedback: noFeedback,
      };
    }

    case 'SET_NOTE_CREATED':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        isNoteCreated: true,
      };

    case 'HIDE_FEEDBACK':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        feedback: {
          message: '',
          isVisible: false,
        },
      };

    case 'CLEAR_FORM':
      return {
        ...initialState,
        formIsValid: false,
        id: generateId(),
      };

    default:
      return state;
  }
};

const useNewNote = () => {
  const [form, dispatch] = useReducer(newNoteReducer, initialState);
  const allTags = useSelector((state: NotesSlice) => state.allTags);

  const headingChangeHandler: InputChangeHandler = event => {
    dispatch({ type: 'CHANGE_HEADING', value: event.currentTarget.value });
  };

  const checkboxChangeHandler = () => {
    dispatch({ type: 'CHANGE_IS_FEATURED' });
  };

  const descriptionChangeHandler: TextareaChangeHandler = event => {
    dispatch({ type: 'CHANGE_DESCRIPTION', value: event.currentTarget.value });
  };

  const tagsChangeHandler: TagsChangeHandler = tags => {
    dispatch({ type: 'CHANGE_TAGS', tags });
  };

  const setNoteStatusToCreated = () => {
    dispatch({ type: 'SET_NOTE_CREATED' });
  };

  const hideFeedback = () => {
    dispatch({ type: 'HIDE_FEEDBACK' });
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
    hideFeedback,
  };
};

export default useNewNote;
