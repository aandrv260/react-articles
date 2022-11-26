import { useDispatch, useSelector } from 'react-redux';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { notesActions } from '../store/notesActions';
import { changeValueToIdInTagsArr } from '../utils/tags';

const useFilter = () => {
  const filters = useSelector((state: NotesSlice) => state.filters);
  const allTags = useSelector((state: NotesSlice) => state.allTags);
  const dispatchFilters = useDispatch();

  const multiSelectValue = changeValueToIdInTagsArr(filters.tags);
  const allTagsIdsToValueArr = changeValueToIdInTagsArr(allTags);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFilters(notesActions.filterChangeHandler(event.currentTarget.value));
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatchFilters(notesActions.filterChangeHandler(tags));
  };

  return {
    filters,
    allTagsIdsToValueArr,
    multiSelectValue,
    titleChangeHandler,
    tagsChangeHandler,
  };
};

export default useFilter;
