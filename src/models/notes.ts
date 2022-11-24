import { NoteTagInfo } from './noteTags';

export interface NoteInfo {
  heading: string;
  tags: NoteTagInfo[];
  isFeatured?: boolean;
}

export interface NoteFilters {
  heading: string;
  tags: NoteTagInfo[];
}

export interface Note extends NoteInfo {
  description: string;
}

export type NotesInfo = NoteInfo[];
