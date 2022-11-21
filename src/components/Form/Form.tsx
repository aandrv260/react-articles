import styles from './Form.module.scss';

interface FormProps {
  children: React.ReactNode;
  hasGroups?: boolean;
}

const Form = ({ children, hasGroups }: FormProps) => {
  const hasGroupsClassName = hasGroups ? styles['with-groups'] : '';

  return (
    <form className={`${styles['form-filter']} ${hasGroupsClassName}`.trim()}>{children}</form>
  );
};

export default Form;
