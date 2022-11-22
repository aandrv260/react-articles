import { NoteFilters, NotesInfo } from './notes';

export interface NotesSlice {
  notes: NotesInfo;
  filteredNotes: NotesInfo;
  filters: NoteFilters;
}
