import { NoteTagInfo } from '../../models/noteTags';
import styles from './NoteTag.module.scss';

type NoteTagProps = NoteTagInfo;

const NoteTag = (props: NoteTagProps) => {
  return <span className={styles['tag']}>{props.text}</span>;
};

export default NoteTag;
