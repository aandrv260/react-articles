import Button, { ButtonProps } from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import styles from './Feedback.module.scss';
import { IonIcon } from 'react-ion-icon';
import { FeedbackStatus } from '../../models/form';

interface FeedbackProps {
  status: FeedbackStatus;
  message: string;
  buttons?: ButtonProps[];
  isVisible: boolean;
  onClose: () => void;
}

const Feedback = (props: FeedbackProps) => {
  const { status, message, buttons, isVisible, onClose } = props;
  const statusClassName = styles[`feedback--${status}`];

  return (
    <>
      {isVisible && message !== '' && (
        <div className={`${styles['feedback']} ${statusClassName}`.trim()}>
          <p className={styles['feedback__message']}>{message}</p>
          <div className={styles['feedback__close']} onClick={() => onClose()}>
            <IonIcon name="close-outline" />
          </div>

          {buttons && buttons.length > 0 && (
            <ButtonGroup>
              {buttons.map(button => (
                <Button {...button} key={Math.random()}>
                  {button.children}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </div>
      )}
    </>
  );
};

export default Feedback;
