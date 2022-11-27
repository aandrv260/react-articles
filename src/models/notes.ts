import { NoteTagInfo } from './noteTags';

export interface NoteInfo {
  heading: string;
  tags: NoteTagInfo[];
  isFeatured?: boolean;
  id: string;
}

export interface NoteFilters {
  heading: string;
  tags: NoteTagInfo[];
}

export interface Note extends NoteInfo {
  description: string;
}

// export type NotesInfo = NoteInfo[];
export type NotesInfo = Note[];
