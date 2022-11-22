import { InputChangeEvent } from '../../models/form';
import MultiSelect from 'react-select/creatable';
import styles from './InputBox.module.scss';
import { useMemo } from 'react';
import { NoteTagInfo } from '../../models/noteTags';

interface InputBoxProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  multiSelectValue?: {
    label: string;
    value: number;
  }[];
  onChange?: InputChangeEvent;
  onMultiSelectChange?: (data: NoteTagInfo[]) => void;
  inputElementType?: 'input' | 'textarea' | 'multi-select';
}

const InputBox: React.FC<InputBoxProps> = props => {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    inputElementType,
    multiSelectValue,
    onMultiSelectChange,
  } = props;

  return (
    <div className={styles['input-box']} data-box="input-box">
      <label htmlFor={id}>{label}</label>

      {inputElementType === 'multi-select' && (
        <MultiSelect
          classNamePrefix="custom-multi-select"
          isMulti
          value={multiSelectValue}
          inputId={id}
          onChange={tags => {
            if (onMultiSelectChange) {
              onMultiSelectChange(
                tags.map(tag => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }
          }}
          styles={{
            control: (baseStyles, state) => {
              return {
                ...baseStyles,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '1.4rem',
                minHeight: 'initial',
                height: '100%',
                backgroundColor: '#fff',
                outline: 'none',
                boxShadow: 'none',
                borderColor: state.isFocused ? 'var(--color-main)' : '#aaa',
              };
            },
          }}
        />
      )}

      {inputElementType === 'textarea' && (
        <textarea placeholder={placeholder} id={id} value={value} onChange={onChange} />
      )}

      {(inputElementType === 'input' || !inputElementType) && (
        <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default InputBox;
