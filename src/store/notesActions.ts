import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { Note } from '../models/notes';
import { NotesSlice } from '../models/store';
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
