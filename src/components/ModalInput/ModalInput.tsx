import { IonIcon } from 'react-ion-icon';
import { useDispatch } from 'react-redux';
import { NoteTagInfo } from '../../models/noteTags';
import { notesActions, writeStateToLocalStorageAfterTagDelete } from '../../store/notesActions';
import styles from '../Modal/Modal.module.scss';

interface ModalInputProps {
  tag: NoteTagInfo;
  onChange?: () => void;
}

const ModalInput = ({ tag, onChange }: ModalInputProps) => {
  const dispatch = useDispatch();

  const deleteTagHandler = () => {
    // dispatch(notesActions.deleteTag(tag));
    dispatch<any>(writeStateToLocalStorageAfterTagDelete(tag));
  };

  return (
    <div className={styles['modal__input-box']}>
      <input type="text" value={tag.label} onChange={onChange} />

      <div className={styles['modal__delete-tag-box']} onClick={deleteTagHandler}>
        <IonIcon size="small" name="close-outline" />
      </div>
    </div>
  );
};

export default ModalInput;
