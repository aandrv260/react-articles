import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
  className?: string;
  children: React.ReactNode;
}

const ButtonGroup = ({ className, children }: ButtonGroupProps) => {
  return <div className={`${styles['button-group']} ${className}`.trim()}>{children}</div>;
};

export default ButtonGroup;
