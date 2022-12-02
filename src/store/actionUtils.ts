import { NoteFilters } from '../models/notes';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';

type GetState = () => NotesSlice;
type UpdateAllTags = (state: NotesSlice) => NoteTagInfo[];

export const saveToLocalStorage = (getState: GetState) => {
  const state = getState();
  const stateToJSON = JSON.stringify(state);

  localStorage.setItem('NOTES_INFO', stateToJSON);
};

/**
 * Loops through all of the notes, takes all of the tags and puts them into the allTags array in the Notes slice
 * @returns All unique tags
 */
export const updateAllTags: UpdateAllTags = state => {
  const tagsFromAllNotes = state.notes
    .reduce<NoteTagInfo[][]>((acc, cur) => {
      const tags = cur.tags;

      acc.push(tags);
      return acc;
    }, [])
    .flat();

  const allUniqueNoteTags = [
    ...new Map(tagsFromAllNotes.map(item => [item['value'], item])).values(),
  ];

  return allUniqueNoteTags;
};

export const resetFilters = (): NoteFilters => {
  return {
    heading: '',
    tags: [],
  };
};
