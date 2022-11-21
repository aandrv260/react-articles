import { createSlice, configureStore } from '@reduxjs/toolkit';
import { NotesInfo } from '../models/notes';

interface NotesSlice {
  notes: NotesInfo;
}

const initialState: NotesSlice = {
  notes: [
    // {
    //   heading: 'Centering a div',
    //   tags: [
    //     { label: 'CSS', id: 1 },
    //     { label: 'HTML', id: 2 },
    //   ],
    //   isFeatured: true,
    // },
    // {
    //   heading: 'Centering a div',
    //   tags: ['CSS', 'HTML'],
    // },
    // {
    //   heading: 'Centering a div',
    //   tags: ['CSS', 'HTML'],
    // },
  ],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    delete() {},

    create(curState, action) {},
  },
});

export const notesActions = notesSlice.actions;

const store = configureStore({
  reducer: notesSlice.reducer,
});

export default store;
