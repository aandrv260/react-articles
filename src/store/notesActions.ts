import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { NoteFormState } from '../models/form';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { EditTag, NotesSlice } from '../models/store';
import { notesSlice } from './';
import { saveToLocalStorage } from './actionUtils';

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
    saveToLocalStorage(getState);
  };
};

// Note - Edit / Delete
export const writeStateToLocalStorageAfterNoteEdit = (
  editedNote: NoteFormState
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch<any>(notesActions.editNote(editedNote));
    saveToLocalStorage(getState);
  };
};

export const writeStateToLocalStorageAfterNoteDelete = (
  id: string
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.deleteNote(id));

    saveToLocalStorage(getState);
  };
};

// TAG - EDIT / DELETE
export const writeStateToLocalStorageAfterTagEdit = (
  tags: EditTag
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.editTag(tags));

    saveToLocalStorage(getState);
  };
};

export const writeStateToLocalStorageAfterTagDelete = (
  tag: NoteTagInfo
): ThunkAction<void, NotesSlice, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(notesActions.deleteTag(tag));

    saveToLocalStorage(getState);
  };
};
