import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalInput from '../ModalInput/ModalInput';
import styles from './Modal.module.scss';

interface ModalProps {
  isVisible: boolean;
  closeHandler: () => void;
}

const Modal = (props: ModalProps) => {
  const { isVisible, closeHandler } = props;
  const allTags = useSelector((state: NotesSlice) => state.allTags);

  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <div className={styles['modal']}>
          <div className={styles['modal__box']}>
            <ModalHeader heading="Edit tags" onClose={closeHandler} />

            <div className={styles['modal__inputs']}>
              {allTags.map(tag => (
                <ModalInput
                  // onChange={tagChangeHandler}
                  tag={tag}
                  key={Math.random()}
                ></ModalInput>
              ))}
            </div>

            <ButtonGroup className={styles['modal__btn-group']}>
              <Button designStyle="full" type="button" onClick={closeHandler}>
                Close
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default Modal;
