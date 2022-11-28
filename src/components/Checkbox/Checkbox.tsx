import { useMemo } from 'react';
import { InputChangeHandler } from '../../models/form';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  onChange: InputChangeHandler;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  // Id with randomly generated number to make sure that the id is unique for every page
  // It must be executed only after the FIRST component render
  const checkboxId = useMemo(() => {
    return `custom-checkbox-${Math.floor(Math.random() * 1238)}`;
  }, []);

  return (
    <div className={styles['checkbox-container']} data-box="checkbox">
      <input
        className={styles['default-checkbox']}
        id={checkboxId}
        type="checkbox"
        aria-hidden={'false'}
        checked={checked}
        onChange={onChange}
      />
      <label className={styles['custom-checkbox']} htmlFor={checkboxId}></label>
      <label className={styles['checkbox-label-text']} htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
