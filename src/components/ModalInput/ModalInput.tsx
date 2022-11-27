import { useState, useMemo } from 'react';
import { IonIcon } from 'react-ion-icon';
import { useDispatch } from 'react-redux';
import { InputChangeHandler } from '../../models/form';

import { NoteTagInfo } from '../../models/noteTags';
import {
  notesActions,
  writeStateToLocalStorageAfterTagDelete,
  writeStateToLocalStorageAfterTagEdit,
} from '../../store/notesActions';
import styles from '../Modal/Modal.module.scss';

interface ModalInputProps {
  tag: NoteTagInfo;
}

const ModalInput = ({ tag }: ModalInputProps) => {
  const [newTag, setNewTag] = useState<NoteTagInfo>(tag);
  const dispatch = useDispatch();

  const tagChangeHandler: InputChangeHandler = event => {
    const newValue = event.currentTarget.value;

    setNewTag({
      label: newValue,
      value: newValue,
    });
  };

  const tagInputBlurHandler = () => {
    if (newTag.value === tag.value) return;

    dispatch<any>(writeStateToLocalStorageAfterTagEdit({ oldTag: tag, newTag }));
  };

  const deleteTagHandler = () => {
    dispatch<any>(writeStateToLocalStorageAfterTagDelete(tag));
  };

  return (
    <div className={styles['modal__input-box']}>
      <input
        type="text"
        value={newTag.value}
        onChange={tagChangeHandler}
        onBlur={tagInputBlurHandler}
      />

      <div className={styles['modal__delete-tag-box']} onClick={deleteTagHandler}>
        <IonIcon size="small" name="close-outline" />
      </div>
    </div>
  );
};

export default ModalInput;
