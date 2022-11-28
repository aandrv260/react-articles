import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const Modal = (props: ModalProps) => {
  const { isVisible, children } = props;

  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <div className={styles['modal']}>
          <div className={styles['modal__box']}>{children}</div>
        </div>
      )}
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default Modal;
