import { NoteTagInfo } from './noteTags';

export interface NoteInfo {
  heading: string;
  tags?: NoteTagInfo[];
  isFeatured?: boolean;
}

export type NotesInfo = NoteInfo[];
