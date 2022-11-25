import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { filterNotes } from './notesFiltersUtils';

type Filter = string | NoteTagInfo[];

// const testNotes = [
//   {
//     heading: 'CSS Selectors',
//     isFeatured: false,
//     tags: [
//       {
//         label: 'CSS',
//         id: Math.random(),
//       },

//       {
//         label: 'HTML',
//         id: Math.random(),
//       },

//       {
//         label: 'Selectors',
//         id: Math.random(),
//       },
//     ],
//   },

//   {
//     heading: 'Centering a DIV',
//     isFeatured: true,
//     tags: [
//       {
//         label: 'CSS',
//         id: Math.random(),
//       },

//       {
//         label: 'HTML',
//         id: Math.random(),
//       },

//       {
//         label: 'Flexbox',
//         id: Math.random(),
//       },
//     ],
//   },

//   {
//     heading: 'JS smooth scroll',
//     isFeatured: false,
//     tags: [
//       {
//         label: 'JS',
//         id: Math.random(),
//       },

//       {
//         label: 'HTML',
//         id: Math.random(),
//       },

//       {
//         label: 'Objects',
//         id: Math.random(),
//       },
//     ],
//   },
// ];

// const allUniqueTags = new Set(testNotes.flatMap(note => note.tags).map(tag => tag.label));
// const tagsUnique = [...allUniqueTags].map(tag => ({
//   label: tag,
//   id: Math.random(),
// }));

// console.log('allTags from redux', allUniqueTags, tagsUnique);

export const initialReduxState: NotesSlice = {
  notes: [],
  allTags: [],
  filteredNotes: [],
  filters: {
    heading: '',
    tags: [],
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState: initialReduxState,
  reducers: {
    /**
     * - Changes the whole state with the one from the action.payload object
     * - Should ONLY be used for getting data from Local Storage
     */
    mutateState(_, action: PayloadAction<NotesSlice>) {
      return {
        ...action.payload,
      };
    },

    delete(curState, action: PayloadAction<string | number>) {},

    filterChangeHandler(curState, action: PayloadAction<Filter>) {
      const filterValue = action.payload;

      if (typeof filterValue === 'string') {
        curState.filters.heading = filterValue;
      } else {
        curState.filters.tags = [...filterValue];
      }

      curState.filteredNotes = filterNotes(curState);
    },

    create(curState, action: PayloadAction<Note>) {
      const newNote = action.payload;

      curState.notes.push(newNote);
      curState.filteredNotes = curState.notes;

      if (curState.allTags.length === 0) {
        curState.allTags = newNote.tags;

        return;
      }

      // Makes the unique tags be pushed into the allTags array
      const newNoteTagsIds = newNote.tags.map(tag => tag.id);
      const allTagIds = curState.allTags.map(tag => tag.id);

      newNoteTagsIds.forEach(newNoteTag => {
        if (!allTagIds.includes(newNoteTag)) {
          const [tagObject] = newNote.tags.filter(tag => tag.id === newNoteTag);

          curState.allTags.push(tagObject);
        }
      });
    },
  },
});

const store = configureStore({
  reducer: notesSlice.reducer,
});

export default store;
