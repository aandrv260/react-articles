import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { NoteInfo } from '../../models/notes';
import { generateSlug } from '../../utils/urlSlugs';
import NoteTags from '../NoteTags/NoteTags';
import styles from './Note.module.scss';

type NoteProps = NoteInfo;

const Note = (props: NoteProps) => {
  const { heading, id, tags, isFeatured } = props;

  const noteSlug = useMemo(() => generateSlug(heading), [heading]);

  return (
    <Link to={`/note/${noteSlug}?id=${id}`} className={styles['note']}>
      <h3 className={styles['note__heading']}>{heading}</h3>
      {isFeatured && <div className={styles['note__label']}>&nbsp;</div>}

      {tags && tags.length > 0 && <NoteTags tags={tags} />}
    </Link>
  );
};

export default Note;
