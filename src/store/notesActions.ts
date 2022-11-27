import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { EditTag, NotesSlice } from '../models/store';
import { notesSlice } from './';

export const notesActions = notesSlice.actions;

// ACTION THUNKS
export const getDataFromLocalStorage = (): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return dispatch => {
    const storedData = localStorage.getItem('NOTES_INFO');

    if (storedData) {
      const parsedData: NotesSlice = JSON.parse(storedData);

      dispatch(notesActions.mutateState(parsedData));
    }
  };
};

export const writeStateToLocalStorage = (
  newNote: Note
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.create(newNote));

    const state = getState();
    const stateToJSON = JSON.stringify(state);

    localStorage.setItem('NOTES_INFO', stateToJSON);
  };
};

// TAG - EDIT / DELETE
export const writeStateToLocalStorageAfterTagEdit = (
  tags: EditTag
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.editTag(tags));

    const state = getState();
    const stateToJSON = JSON.stringify(state);

    localStorage.setItem('NOTES_INFO', stateToJSON);
  };
};

export const writeStateToLocalStorageAfterTagDelete = (
  tag: NoteTagInfo
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.deleteTag(tag));

    const state = getState();
    const stateToJSON = JSON.stringify(state);

    localStorage.setItem('NOTES_INFO', stateToJSON);
  };
};
