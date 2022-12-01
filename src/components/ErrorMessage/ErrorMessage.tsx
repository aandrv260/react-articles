import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className={styles['no-notes-error']}>{message}</p>;
};

export default ErrorMessage;
