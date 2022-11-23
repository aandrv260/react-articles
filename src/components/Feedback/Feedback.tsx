import Button, { ButtonProps } from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import styles from './Feedback.module.scss';
import { IonIcon } from 'react-ion-icon';

interface FeedbackProps {
  status: 'success' | 'failure' | 'warning';
  message: string;
  buttons?: ButtonProps[];
  isVisible: boolean;
  setVisibility: (visiblity: boolean) => void;
}

const Feedback = (props: FeedbackProps) => {
  const { status, message, buttons, isVisible, setVisibility } = props;
  const statusClassName = styles[`feedback--${status}`];

  return (
    <>
      {isVisible && (
        <div className={`${styles['feedback']} ${statusClassName}`}>
          <p className={styles['feedback__message']}>{message}</p>
          <div className={styles['feedback__close']} onClick={() => setVisibility(false)}>
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
