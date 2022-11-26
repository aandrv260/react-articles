import { Link } from 'react-router-dom';
import { NoteInfo } from '../../models/notes';
import NoteTags from '../NoteTags/NoteTags';
import styles from './Note.module.scss';

type NoteProps = NoteInfo;

const Note = (props: NoteProps) => {
  const { heading, id, tags, isFeatured } = props;

  return (
    <Link to={`/note/${id}`} className={styles['note']}>
      <h3 className={styles['note__heading']}>{heading}</h3>
      {isFeatured && <div className={styles['note__label']}>&nbsp;</div>}

      {tags && tags.length > 0 && <NoteTags tags={tags} />}
    </Link>
  );
};

export default Note;
