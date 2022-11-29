import { InputChangeHandler, TextareaChangeHandler } from '../../models/form';
import Select from 'react-select/creatable';
import styles from './InputBox.module.scss';
import { NoteTagInfo } from '../../models/noteTags';
import TooltipContainer from '../TooltipContainer/TooltipContainer';
import { useCallback } from 'react';

interface TooltipOptions {
  color: string;
  text: string;
}
interface InputBoxProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  options?: NoteTagInfo[];
  multiSelectValue?: NoteTagInfo[];
  onInputChange?: InputChangeHandler;
  onTextareaChange?: TextareaChangeHandler;
  onMultiSelectChange?: (data: NoteTagInfo[]) => void;
  inputElementType?: 'input' | 'textarea' | 'multi-select';
  tooltip?: TooltipOptions;
}

const InputBox: React.FC<InputBoxProps> = props => {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    onInputChange,
    onTextareaChange,
    options,
    inputElementType,
    multiSelectValue,
    onMultiSelectChange,
    tooltip,
  } = props;

  return (
    <div className={styles['input-box']} data-box="input-box">
      <label htmlFor={id}>{label}</label>

      {inputElementType === 'multi-select' && (
        <Select
          classNamePrefix="custom-multi-select"
          isMulti
          value={multiSelectValue}
          inputId={id}
          options={options}
          createOptionPosition="first"
          onChange={tags => {
            if (onMultiSelectChange) {
              // creating a new array because of a conflict with types
              const filterTags: NoteTagInfo[] = [...tags];
              onMultiSelectChange(filterTags);
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
        <>
          {tooltip && (
            <TooltipContainer color="#333" text="My first tooltip">
              <textarea
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onTextareaChange}
              />
            </TooltipContainer>
          )}

          {!tooltip && (
            <textarea placeholder={placeholder} id={id} value={value} onChange={onTextareaChange} />
          )}
        </>
      )}

      {(inputElementType === 'input' || !inputElementType) && (
        <>
          {tooltip && (
            <TooltipContainer color="#333" text="My first tooltip">
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onInputChange}
              />
            </TooltipContainer>
          )}

          {!tooltip && (
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onInputChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InputBox;
