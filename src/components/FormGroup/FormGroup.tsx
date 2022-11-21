import styles from '../Form/Form.module.scss';

interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <div className={styles['form-filter__group']}>{children}</div>;
};

export default FormGroup;
