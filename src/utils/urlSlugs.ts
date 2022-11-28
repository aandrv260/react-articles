import slugify from 'slugify';

export const generateSlug = (noteTitle: string) => {
  return slugify(noteTitle, {
    lower: true,
    trim: true,
  });
};
