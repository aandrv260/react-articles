import { NoteTagInfo } from '../models/noteTags';

export const changeValueToIdInTagsArr = (tags: NoteTagInfo[]) => {
  return tags.map(tag => ({ label: tag.label, value: tag.id }));
};
