import { useReducer, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormReducer,
  FormType,
  InputChangeHandler,
  TagsChangeHandler,
  TextareaChangeHandler,
} from '../models/form';
import { NotesSlice } from '../models/store';
import { writeStateToLocalStorage } from '../store/notesActions';
import { convertNoteToFormState, initialState, noFeedback } from '../utils/Form/form';
import { entireFormIsValid, validateTextInput } from '../utils/Form/formValidation';
import generateId from '../utils/generateId';

const noteFormReducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_HEADING': {
      return validateTextInput(
        state,
        { type: 'heading', value: action.value },
        'The heading must have >= 5 characters.'
      );
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
      return validateTextInput(
        state,
        { type: 'description', value: action.value },
        'Description must contain at least 20 characters.'
      );
    }

    case 'SET_NOTE_CREATED':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        status: 'NOTE_CREATED',
        feedback: {
          message: 'Successfully created your new note!',
          isVisible: true,
        },
        isNoteCreated: true,
      };

    case 'INPUT_INVALID_ON_SUBMIT':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        status: 'VALIDATION_ISSUE',
        feedback: {
          message: 'Form invalid',
          isVisible: true,
        },
      };

    case 'HIDE_FEEDBACK':
      return {
        ...state,
        formIsValid: entireFormIsValid({ heading: state.heading, description: state.description }),
        feedback: noFeedback,
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

const useNoteForm = (formType: FormType, noteId?: string) => {
  const allNotes = useSelector((store: NotesSlice) => store.notes);
  const allTags = useSelector((state: NotesSlice) => state.allTags);
  const noteExists = allNotes.some(note => note.id === noteId);
  const curNote = allNotes.find(note => note.id === noteId);

  const initialState = useMemo(() => {
    // This IF statement fixes the bug where on reload, the input fields are empty
    // because the state has not been fetched from the local storage yet
    // !! This is a temporary fix because it is not really good to use side effects in the useMemo() hook
    if (!noteExists) {
      const stateFromLocalStorage: NotesSlice =
        JSON.parse(localStorage.getItem('NOTES_INFO') || '') || initialState;
      const curNote = stateFromLocalStorage.notes.find(note => note.id === noteId);

      return convertNoteToFormState(curNote, formType, noteId);
    }

    return convertNoteToFormState(curNote, formType, noteId);
  }, []);

  const [form, dispatch] = useReducer(noteFormReducer, initialState);
  const dispatchNote = useDispatch();

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

  const createNote = () => {
    if (!form.formIsValid) {
      dispatch({ type: 'INPUT_INVALID_ON_SUBMIT' });

      return;
    }

    dispatchNote<any>(writeStateToLocalStorage(form));
    clearForm();
    setNoteStatusToCreated();
  };

  const editForm = () => {
    if (!form.formIsValid) {
      dispatch({ type: 'INPUT_INVALID_ON_SUBMIT' });

      return;
    }
  };

  // DO THIS AFTER YOU FIX THE RELOAD BUG
  const resetEditForm = () => {};

  return {
    form,
    dispatchForm: dispatch,
    headingChangeHandler,
    checkboxChangeHandler,
    descriptionChangeHandler,
    tagsChangeHandler,
    resetEditForm,
    clearForm,
    submitForm: formType === 'create' ? createNote : editForm,
    allTags,
    hideFeedback,
  };
};

export default useNoteForm;
