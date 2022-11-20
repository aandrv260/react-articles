import { NotesInfo } from '../../models/notes';
import { NoteTagsInfo } from '../../models/noteTags';
import Note from '../Note/Note';
import NoteTag from '../NoteTag/NoteTag';
import styles from './Notes.module.scss';

interface NotesProps {
  notes: NotesInfo;
}

const Notes = (props: NotesProps) => {
  // TODO: Take the notes from the redux or context api

  return (
    <>
      {props.notes.length > 0 && (
        <div className={styles['notes']}>
          {props.notes.map(note => (
            <Note
              heading={note.heading}
              tags={note.tags}
              isFeatured={note.isFeatured}
              key={Math.random()}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
