import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteFilters, NoteInfo, NotesInfo } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';

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
    },

    filter(curState, action: PayloadAction<Filter>) {
      const { filters } = curState;

      // If both filters are empty, display all notes
      if (filters.heading === '' && filters.tags.length === 0) {
        curState.filteredNotes = [...curState.notes];
      }

      // If the heading filter is empty and there are tags filter
      if (filters.heading === '' && filters.tags.length > 0) {
        const filterTags = filters.tags;
        const notes = curState.notes;
        const newNotes: NoteInfo[] = [];

        for (const note of notes) {
          const noteTags = note?.tags;

          const allNoteTags = noteTags?.map(noteTag => noteTag.label.toLowerCase()) || [];
          const allFilterTags = filterTags.map(filterTag => filterTag.label.toLowerCase());
          const match = allFilterTags.every(filterTag => allNoteTags.includes(filterTag));

          console.log(match);

          if (match) {
            newNotes.push(note);
          }
        }
        curState.filteredNotes = newNotes;
      }

      // If the heading filter is not empty and the tags filter is empty
      if (filters.heading !== '' && filters.tags.length === 0) {
        const filterHeading = filters.heading.trim();
        const allNotes = curState.notes;
        const newNotes: NoteInfo[] = [];

        allNotes.forEach(note => {
          if (note.heading.toLowerCase().includes(filterHeading.toLowerCase())) {
            newNotes.push(note);
          }
        });

        curState.filteredNotes = newNotes;
      }

      // If both filters are not empty
      if (filters.heading !== '' && filters.tags.length > 0) {
        const filterTags = filters.tags;
        const filterHeading = filters.heading.trim();
        const allNotes = curState.notes;
        const newNotes: NoteInfo[] = [];

        // Loop through all notes
        for (const note of allNotes) {
          let headingFilterMatch = false;
          const noteTags = note?.tags;

          // Define if the heading filter text is included in the note heading
          if (note.heading.includes(filterHeading)) {
            headingFilterMatch = true;
          }

          // Define if all of the tags in the filter are included in the note
          const allNoteTags = noteTags?.map(noteTag => noteTag.label.toLowerCase()) || [];
          const allFilterTags = filterTags.map(filterTag => filterTag.label.toLowerCase());
          const tagsFilterMatch = allFilterTags.every(filterTag => allNoteTags.includes(filterTag));

          // If yes, push this note in the newNotes array
          if (headingFilterMatch && tagsFilterMatch) {
            newNotes.push(note);
          }
        }

        // Uncomment the line below when you are done with everything from above
        curState.filteredNotes = newNotes;
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
