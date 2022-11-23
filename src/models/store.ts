import { NoteFilters, NotesInfo } from './notes';
import { NoteTagInfo } from './noteTags';

export interface NotesSlice {
  notes: NotesInfo;
  filteredNotes: NotesInfo;
  filters: NoteFilters;
}
