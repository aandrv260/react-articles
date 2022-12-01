import { NotesInfo } from '../../models/notes';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Note from '../Note/Note';
import styles from './Notes.module.scss';

interface NotesProps {
  notes: NotesInfo;
}

const Notes = ({ notes }: NotesProps) => {
  return (
    <>
      {notes.length === 0 && <ErrorMessage message="No notes found" />}

      {notes.length > 0 && (
        <div className={styles['notes']}>
          {notes.map(note => (
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
