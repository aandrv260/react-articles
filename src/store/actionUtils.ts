import { NotesSlice } from '../models/store';

type GetState = () => NotesSlice;

export const saveToLocalStorage = (getState: GetState) => {
  const state = getState();
  const stateToJSON = JSON.stringify(state);

  localStorage.setItem('NOTES_INFO', stateToJSON);
};
