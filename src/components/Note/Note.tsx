import { NoteInfo } from '../../models/notes';
import { NoteTagInfo } from '../../models/noteTags';
import NoteTag from '../NoteTag/NoteTag';
import NoteTags from '../NoteTags/NoteTags';
import styles from './Note.module.scss';
// #4f4fec

type NoteProps = NoteInfo;

const testTags: NoteTagInfo[] = [
  // { label: 'CSS', id: 1 },
  // { label: 'HTML', id: 2 },
  // { label: 'JS', id: 3 },
];

const Note = (props: NoteProps) => {
  return (
    <div className={styles['note']}>
      <h3 className={styles['note__heading']}>{props.heading}</h3>
      {props.isFeatured && <div className={styles['note__label']}>&nbsp;</div>}

      {props.tags && props.tags.length > 0 && <NoteTags tags={props.tags} />}
    </div>
  );
};

export default Note;
