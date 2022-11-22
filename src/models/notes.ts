import { NoteTagInfo } from './noteTags';

export interface NoteInfo {
  heading: string;
  tags?: NoteTagInfo[];
  isFeatured?: boolean;
}

export interface Note extends NoteInfo {
  description: string;
}

export type NotesInfo = NoteInfo[];
