import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup = ({ children }: ButtonGroupProps) => {
  return <div className={styles['button-group']}>{children}</div>;
};

export default ButtonGroup;
