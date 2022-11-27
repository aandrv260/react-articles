import { NoteFilters, NotesInfo } from './notes';
import { NoteTagInfo } from './noteTags';

export interface NotesSlice {
  notes: NotesInfo;
  allTags: NoteTagInfo[];
  filteredNotes: NotesInfo;
  filters: NoteFilters;
}

export type EditTag = {
  oldTag: NoteTagInfo;
  newTag: NoteTagInfo;
};
