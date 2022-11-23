import { useDispatch, useSelector } from 'react-redux';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { notesActions } from '../store';

const changeValueToIdInTagsArr = (tags: NoteTagInfo[]) => {
  return tags.map(tag => ({ label: tag.label, value: tag.id }));
};

const useFilter = () => {
  const filters = useSelector((state: NotesSlice) => state.filters);
  const allTags = useSelector((state: NotesSlice) => state.allTags);
  const dispatchFilters = useDispatch();

  // const multiSelectValue = filters.tags.map(tag => ({ label: tag.label, value: tag.id }));
  const multiSelectValue = changeValueToIdInTagsArr(filters.tags);
  const initialTagOptions = changeValueToIdInTagsArr(allTags);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFilters(notesActions.filterChangeHandler(event.currentTarget.value));
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatchFilters(notesActions.filterChangeHandler(tags));
  };

  return {
    filters,
    initialTagOptions,
    multiSelectValue,
    titleChangeHandler,
    tagsChangeHandler,
  };
};

export default useFilter;
