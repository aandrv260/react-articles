import { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';
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

  const ModalContent = useCallback(() => {
    return (
      <>
        {isVisible && (
          <div className={styles['modal']}>
            <div className={styles['modal__box']}>
              <ModalHeader heading="Edit tags" onClose={closeHandler} />

              {allTags.map(tag => (
                <ModalInput tag={tag} key={Math.random()}></ModalInput>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }, [isVisible, allTags, closeHandler]);

  return ReactDOM.createPortal(<ModalContent />, document.getElementById('modal')!);
};

export default Modal;
