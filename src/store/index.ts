import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteFilters, NotesInfo } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';

// interface FilterChangeHandler {
//   value: string;

// }

const initialState: NotesSlice = {
  notes: [],
  filteredNotes: [],
  filters: {
    heading: '3',
    tags: [],
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    delete() {},

    filterChangeHandler(curState, action: PayloadAction<string | NoteTagInfo[]>) {
      const filterValue = action.payload;

      if (typeof filterValue === 'string') {
        curState.filters.heading = filterValue;
      } else {
        curState.filters.tags = [...filterValue];
      }
    },

    create(curState, action: PayloadAction<Note>) {
      curState.notes.push(action.payload);
    },
  },
});

export const notesActions = notesSlice.actions;

const store = configureStore({
  reducer: notesSlice.reducer,
});

export default store;
