export interface NoteInfo {
  heading: string;
  tags?: string[];
  isFeatured?: boolean;
}

export type NotesInfo = NoteInfo[];
