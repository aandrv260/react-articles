import { NoteTagsInfo } from '../../models/noteTags';
import NoteTag from '../NoteTag/NoteTag';
import styles from './NoteTags.module.scss';

type NoteTagsProps = NoteTagsInfo;

const NoteTags = (props: NoteTagsProps) => {
  return (
    <div className={styles['tags']}>
      {props.tags.map(tag => (
        <NoteTag text={tag} key={Math.random()} />
      ))}
    </div>
  );
};

export default NoteTags;
