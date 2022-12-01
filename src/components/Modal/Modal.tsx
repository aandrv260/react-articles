import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';

import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const Modal = (props: ModalProps) => {
  const { isVisible, children } = props;

  return ReactDOM.createPortal(
    <Transition in={isVisible} timeout={300} mountOnEnter unmountOnExit>
      {transitionState => {
        const classNames = [
          styles['modal'],
          transitionState === 'entering' || transitionState === 'entered'
            ? styles['modal-opening']
            : transitionState === 'exiting'
            ? styles['modal-closing']
            : null,
        ];

        return (
          <div className={classNames.join(' ')}>
            <div className={styles['modal__box']}>{children}</div>
          </div>
        );
      }}
    </Transition>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default Modal;
