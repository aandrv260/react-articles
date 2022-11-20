import { NoteInfo } from '../../models/notes';
import NoteTag from '../NoteTag/NoteTag';
import NoteTags from '../NoteTags/NoteTags';
import styles from './Note.module.scss';
// #4f4fec

type NoteProps = NoteInfo;

const testTags = ['CSS', 'HTML', 'JS'];

const Note = (props: NoteProps) => {
  return (
    <div className={styles['note']}>
      <h3 className={styles['note__heading']}>{props.heading}</h3>
      {props.isFeatured && <div className={styles['note__label']}>&nbsp;</div>}

      <NoteTags tags={testTags} />
    </div>
  );
};

export default Note;
