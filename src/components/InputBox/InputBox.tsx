import { InputChangeEvent } from '../../models/form';
import styles from './InputBox.module.scss';

interface InputBoxProps {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange?: InputChangeEvent;
}

const InputBox: React.FC<InputBoxProps> = ({ id, label, type, placeholder, value, onChange }) => {
  return (
    <div className={styles['input-box']}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default InputBox;
