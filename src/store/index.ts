import { createSlice, configureStore, PayloadAction, current } from '@reduxjs/toolkit';
import { NoteFormState } from '../models/form';
import { Note } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice, EditTag } from '../models/store';
import { formStateToNote } from '../utils/Form/form';
import { resetFilters, updateAllTags } from './actionUtils';
import { filterNotes } from './notesFiltersUtils';

type Filter = string | NoteTagInfo[];

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

    editNote(curState, action: PayloadAction<NoteFormState>) {
      const editedNote = action.payload;
      const { heading, description, isFeatured, tags } = editedNote;
      const indexOfNote = curState.notes.findIndex(note => note.id === editedNote.id);

      // Edit note's values
      Object.assign(curState.notes[indexOfNote], { heading, description, isFeatured, tags });

      curState.allTags = updateAllTags(curState);
      curState.filters = resetFilters();
      curState.filteredNotes = curState.notes;
    },

    deleteNote(curState, action: PayloadAction<string>) {
      const noteId = action.payload;
      const indexOfNote = curState.notes.findIndex(note => note.id === noteId);

      if (indexOfNote) {
        curState.notes.splice(indexOfNote, 1);
      }

      curState.filteredNotes = curState.notes;
      curState.filters = resetFilters();
    },

    deleteTag(curState, action: PayloadAction<NoteTagInfo>) {
      const indexOfTag = curState.allTags.findIndex(tag => tag.value === action.payload.value);

      curState.allTags.splice(indexOfTag, 1);

      // Delete the tag from all of the notes that contain it
      curState.notes.forEach(note => {
        const tagIndex = note.tags.findIndex(tag => tag.value === action.payload.value);

        if (tagIndex !== -1) {
          note.tags.splice(tagIndex, 1);
        }

        curState.filteredNotes = curState.notes;
        curState.filters = resetFilters();
      });
    },

    editTag(curState, action: PayloadAction<EditTag>) {
      const { oldTag, newTag } = action.payload;

      // Update allTags array
      const indexOfOldTag = curState.allTags.findIndex(tag => tag.value === oldTag.value);
      curState.allTags[indexOfOldTag].label = newTag.label;
      curState.allTags[indexOfOldTag].value = newTag.value;

      // Update each tag in the note that has the value of oldTag
      curState.notes.forEach(note => {
        note.tags.forEach(tag => {
          if (tag.value === oldTag.value) {
            tag.value = newTag.value;
            tag.label = newTag.label;
          }
        });
      });

      curState.filteredNotes = curState.notes;
      curState.filters = resetFilters();
    },

    filterChangeHandler(curState, action: PayloadAction<Filter>) {
      const filterValue = action.payload;

      if (typeof filterValue === 'string') {
        curState.filters.heading = filterValue;
      } else {
        curState.filters.tags = [...filterValue];
      }

      curState.filteredNotes = filterNotes(curState);
    },

    create(curState, action: PayloadAction<NoteFormState>) {
      const newNote: Note = formStateToNote(action.payload);

      curState.notes.push(newNote);
      curState.filteredNotes = curState.notes;

      if (curState.allTags.length === 0) {
        curState.allTags = newNote.tags;

        return;
      }

      curState.allTags = updateAllTags(curState);
      curState.filters = resetFilters();
    },
  },
});

const store = configureStore({
  reducer: notesSlice.reducer,
});

export default store;
