import { useDispatch, useSelector } from 'react-redux';
import { NoteTagInfo } from '../models/noteTags';
import { NotesSlice } from '../models/store';
import { notesActions } from '../store/notesActions';

const useFilter = () => {
  const filters = useSelector((state: NotesSlice) => state.filters);
  const allTags = useSelector((state: NotesSlice) => state.allTags);
  const dispatchFilters = useDispatch();

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchFilters(notesActions.filterChangeHandler(event.currentTarget.value));
  };

  const tagsChangeHandler = (tags: NoteTagInfo[]) => {
    dispatchFilters(notesActions.filterChangeHandler(tags));
  };

  return {
    filters,
    allTags,
    titleChangeHandler,
    tagsChangeHandler,
  };
};

export default useFilter;
