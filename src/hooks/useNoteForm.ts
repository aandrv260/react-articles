import { useReducer, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormEventHandlers, FormReducer, FormType, NoteFormState } from '../models/form';
import { NotesSlice } from '../models/store';
import { initialReduxState } from '../store';
import {
  writeStateToLocalStorage,
  writeStateToLocalStorageAfterNoteEdit,
} from '../store/notesActions';
import { convertNoteToFormState, initialState, noFeedback } from '../utils/Form/form';
import { validateInputsAndReturnResult, validateTextInput } from '../utils/Form/formValidation';
import generateId from '../utils/generateId';

const noteFormReducer: FormReducer = (state, action): NoteFormState => {
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
        validation: validateInputsAndReturnResult(state.heading, state.description),
        isFeatured: !state.isFeatured,
      };

    case 'CHANGE_TAGS':
      return {
        ...state,
        validation: validateInputsAndReturnResult(state.heading, state.description),
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
        validation: validateInputsAndReturnResult(state.heading, state.description),
        status: 'NOTE_CREATED',
        feedback: {
          message: 'Successfully created your new note!',
          isVisible: true,
        },
      };

    case 'INPUT_INVALID_ON_SUBMIT':
      return {
        ...state,
        validation: validateInputsAndReturnResult(state.heading, state.description),
        status: 'VALIDATION_ISSUE',
        feedback: {
          message: 'Form invalid',
          isVisible: true,
        },
      };

    case 'HIDE_FEEDBACK':
      return {
        ...state,
        validation: validateInputsAndReturnResult(state.heading, state.description),
        feedback: noFeedback,
      };

    case 'CLEAR_FORM':
      return {
        ...initialState,
        id: generateId(),
      };

    case 'RESET_EDIT_FORM':
      return {
        ...action.curNote!,
        status: 'FORM_RESET',
        validation: validateInputsAndReturnResult(
          action!.curNote!.heading,
          action!.curNote!.description
        ),

        feedback: {
          message: 'Form reset successfully!',
          isVisible: true,
        },
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

  // No dependencies because it MUST run only once to set up the initial state of the useReducer
  const initialFormState = useMemo(() => {
    // This IF statement fixes the bug where on reload, the input fields are empty
    // because the state has not been fetched from the local storage yet
    // !! This is a temporary fix because it is not really good to use side effects in the useMemo() hook
    if (!noteExists) {
      const stateFromLocalStorage = localStorage.getItem('NOTES_INFO');
      let parsedState: NotesSlice = initialReduxState;

      if (stateFromLocalStorage) {
        parsedState = JSON.parse(stateFromLocalStorage);
      }

      const curNote = parsedState.notes.find(note => note.id === noteId);

      return convertNoteToFormState(curNote, formType, noteId);
    }

    return convertNoteToFormState(curNote, formType, noteId);
  }, []);

  const [form, dispatch] = useReducer(noteFormReducer, initialFormState);
  const dispatchNote = useDispatch();

  const setNoteStatusToCreated = () => {
    dispatch({ type: 'SET_NOTE_CREATED' });
  };

  const clearForm = () => {
    dispatch({ type: 'CLEAR_FORM' });
  };

  const createNote = () => {
    if (!form.validation.entireFormIsValid) {
      dispatch({ type: 'INPUT_INVALID_ON_SUBMIT' });

      return;
    }

    dispatchNote<any>(writeStateToLocalStorage(form));
    clearForm();
    setNoteStatusToCreated();
  };

  const editForm = () => {
    if (!form.validation.entireFormIsValid) {
      dispatch({ type: 'INPUT_INVALID_ON_SUBMIT' });

      return;
    }

    dispatchNote<any>(writeStateToLocalStorageAfterNoteEdit(form));
  };

  const resetEditForm = () => {
    if (curNote) {
      dispatch({ type: 'RESET_EDIT_FORM', curNote });

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const eventHandlers: FormEventHandlers = {
    headingChange: event => dispatch({ type: 'CHANGE_HEADING', value: event.currentTarget.value }),
    checkboxChange: () => dispatch({ type: 'CHANGE_IS_FEATURED' }),

    descriptionChange: event =>
      dispatch({ type: 'CHANGE_DESCRIPTION', value: event.currentTarget.value }),

    tagsChange: tags => dispatch({ type: 'CHANGE_TAGS', tags }),
    hideFeedback: () => dispatch({ type: 'HIDE_FEEDBACK' }),
    resetForm: formType === 'create' ? clearForm : resetEditForm,
    submitForm: formType === 'create' ? createNote : editForm,
    setNoteStatusToCreated,
  };

  return { form, eventHandlers, allTags };
};

export default useNoteForm;
