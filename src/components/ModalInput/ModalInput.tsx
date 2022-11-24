import { IonIcon } from 'react-ion-icon';
import { NoteTagInfo } from '../../models/noteTags';
import styles from '../Modal/Modal.module.scss';

interface ModalInputProps {
  tag: NoteTagInfo;
  onChange?: () => void;
}

const ModalInput = ({ tag, onChange }: ModalInputProps) => {
  return (
    <div className={styles['modal__input-box']}>
      <input type="text" value={tag.label} onChange={onChange} />

      <div className={styles['modal__delete-tag-box']}>
        <IonIcon size="small" name="close-outline" />
      </div>
    </div>
  );
};

export default ModalInput;
