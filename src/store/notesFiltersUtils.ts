import { WritableDraft } from 'immer/dist/internal';
import { NoteInfo } from '../models/notes';
import { NotesSlice } from '../models/store';

// TYPES
type FiltersIsEmptyCheck = (curState: WritableDraft<NotesSlice>) => boolean;
type FilterCheck = (curState: WritableDraft<NotesSlice>, note: WritableDraft<NoteInfo>) => boolean;
type FilterNotes = (curState: WritableDraft<NotesSlice>, setCondition: FilterCheck) => NoteInfo[];

// UTIL FUNCTIONS
export const areFiltersEmpty: FiltersIsEmptyCheck = curState => {
  const { heading, tags } = curState.filters;

  return heading === '' && tags.length === 0;
};

export const isThereHeadingFilterMatch: FilterCheck = (curState, note) => {
  const filterHeading = curState.filters.heading.trim().toLowerCase();
  const match = note.heading.toLowerCase().includes(filterHeading);

  return match;
};

export const isThereTagsFilterMatch: FilterCheck = (curState, note) => {
  const noteTags = note?.tags;
  const filterTags = curState.filters.tags;

  const allNoteTags = noteTags?.map(noteTag => noteTag.label.toLowerCase()) || [];
  const allFilterTags = filterTags.map(filterTag => filterTag.label.toLowerCase());
  const match = allFilterTags.every(filterTag => allNoteTags.includes(filterTag));

  return match;
};

export const areBothFiltersApplied: FilterCheck = (curState, note) => {
  const headingMatch = isThereHeadingFilterMatch(curState, note);
  const tagsMatch = isThereTagsFilterMatch(curState, note);

  return headingMatch && tagsMatch;
};

export const getFilteredNotes: FilterNotes = (curState, setCondition) => {
  const allNotes = curState.notes;
  const newNotes: NoteInfo[] = [];

  allNotes.forEach(note => {
    const match = setCondition(curState, note);

    if (match) newNotes.push(note);
  });

  return newNotes;
};

export const filterNotes = (curState: WritableDraft<NotesSlice>) => {
  const { filters } = curState;
  let filteredNotes: NoteInfo[] = [];

  // If both filters are empty, display all notes
  if (areFiltersEmpty(curState)) {
    // curState.filteredNotes = [...curState.notes];
    // return;
    return curState.notes;
  }

  // If the heading filter is empty and there are tags filter
  if (filters.heading === '' && filters.tags.length > 0) {
    filteredNotes = getFilteredNotes(curState, isThereTagsFilterMatch);
  }

  // If the heading filter is not empty and the tags filter is empty
  if (filters.heading !== '' && filters.tags.length === 0) {
    filteredNotes = getFilteredNotes(curState, isThereHeadingFilterMatch);
  }

  // If both filters are not empty
  if (filters.heading !== '' && filters.tags.length > 0) {
    filteredNotes = getFilteredNotes(curState, areBothFiltersApplied);
  }

  // curState.filteredNotes = newNotes;

  return filteredNotes;
};
