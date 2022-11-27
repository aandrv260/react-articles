import { NotesInfo } from '../../models/notes';
import Note from '../Note/Note';
import styles from './Notes.module.scss';

interface NotesProps {
  notes: NotesInfo;
}

const Notes = (props: NotesProps) => {
  return (
    <>
      {props.notes.length > 0 && (
        <div className={styles['notes']}>
          {props.notes.map(note => (
            <Note
              heading={note.heading}
              tags={note.tags}
              isFeatured={note.isFeatured}
              key={note.id}
              id={note.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
