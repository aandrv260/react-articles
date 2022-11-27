import { Note, NoteFilters, NotesInfo } from './notes';
import { NoteTagInfo } from './noteTags';

export interface NotesSlice {
  notes: Note[];
  allTags: NoteTagInfo[];
  filteredNotes: Note[];
  filters: NoteFilters;
}

export type EditTag = {
  oldTag: NoteTagInfo;
  newTag: NoteTagInfo;
};
