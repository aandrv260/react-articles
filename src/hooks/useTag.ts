import { useState } from 'react';
import { NoteTagInfo } from '../models/noteTags';

const useTag = () => {
  const [tagsFiltered, setTagsFiltered] = useState<NoteTagInfo[]>([]);

  const multiSelectValue = tagsFiltered.map(tag => ({ label: tag.label, value: tag.value }));

  return {
    tagsFiltered,
    multiSelectValue,
    setTagsFiltered,
  };
};

export default useTag;
