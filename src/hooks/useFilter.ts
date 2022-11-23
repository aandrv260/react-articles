import { useDispatch, useSelector } from 'react-redux';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { notesActions } from '../store';

const useFilter = () => {
  const filters = useSelector((state: NotesSlice) => state.filters);
  const dispatchFilters = useDispatch();

  const multiSelectValue = filters.tags.map(tag => ({ label: tag.label, value: tag.id }));

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFilters(notesActions.filterChangeHandler(event.currentTarget.value));
    dispatchFilters(notesActions.filter(event.currentTarget.value));
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatchFilters(notesActions.filterChangeHandler(tags));
    dispatchFilters(notesActions.filter(tags));
  };

  return {
    filters,
    multiSelectValue,
    titleChangeHandler,
    tagsChangeHandler,
  };
};

export default useFilter;
