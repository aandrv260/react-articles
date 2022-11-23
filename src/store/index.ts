import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteInfo } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import {
  areBothFiltersApplied,
  areFiltersEmpty,
  filterNotes,
  isThereHeadingFilterMatch,
  isThereTagsFilterMatch,
} from './notesFiltersUtils';

type Filter = string | NoteTagInfo[];

const testNotes = [
  {
    heading: 'CSS Selectors',
    isFeatured: false,
    tags: [
      {
        label: 'CSS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Selectors',
        id: 3,
      },
    ],
  },

  {
    heading: 'Centering a DIV',
    isFeatured: true,
    tags: [
      {
        label: 'CSS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Flexbox',
        id: 3,
      },
    ],
  },

  {
    heading: 'JS smooth scroll',
    isFeatured: false,
    tags: [
      {
        label: 'JS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Objects',
        id: 3,
      },
    ],
  },
];

const initialState: NotesSlice = {
  notes: testNotes,
  filteredNotes: testNotes,
  filters: {
    heading: '',
    tags: [],
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    delete() {},

    filterChangeHandler(curState, action: PayloadAction<Filter>) {
      const filterValue = action.payload;

      if (typeof filterValue === 'string') {
        curState.filters.heading = filterValue;
      } else {
        curState.filters.tags = [...filterValue];
      }

      curState.filteredNotes = filterNotes(curState);
    },

    // filter(curState, action: PayloadAction<null>) {

    // },

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
