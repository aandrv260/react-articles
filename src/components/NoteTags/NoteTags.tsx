import { NoteTagsInfo } from '../../models/noteTags';
import NoteTag from '../NoteTag/NoteTag';
import styles from './NoteTags.module.scss';

interface NoteTagsProps extends NoteTagsInfo {
  className?: string;
}

const NoteTags = ({ tags, className }: NoteTagsProps) => {
  return (
    <div className={`${styles['tags']} ${className}`.trim()}>
      {tags.map(tag => (
        <NoteTag label={tag.label} key={Math.random()} />
      ))}
    </div>
  );
};

export default NoteTags;
