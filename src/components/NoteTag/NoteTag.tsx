import { NoteTagInfo } from '../../models/noteTags';
import styles from './NoteTag.module.scss';

type NoteTagProps = {
  label: string;
};

const NoteTag = (props: NoteTagProps) => {
  return <span className={styles['tag']}>{props.label}</span>;
};

export default NoteTag;
