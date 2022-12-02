import { InputChangeHandler, TextareaChangeHandler } from '../../models/form';
import Select from 'react-select/creatable';
import styles from './InputBox.module.scss';
import { NoteTagInfo } from '../../models/noteTags';
import TooltipContainer from '../TooltipContainer/TooltipContainer';
import { useState } from 'react';

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
  onTextareaChange?: TextareaChangeHandler;
  onInputChange?: InputChangeHandler;
  onMultiSelectChange?: (data: NoteTagInfo[]) => void;
  inputElementType?: 'input' | 'textarea' | 'multi-select';
  noValidation?: boolean;

  /**
   * This must be specified if `inputElementType` is 'input' or 'textarea'
   */
  isValid?: boolean;
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
    isValid,
    noValidation,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const focusHandler = () => {
    setIsFocused(true);
  };

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
          <TooltipContainer color={'#911a1a'} text={tooltip?.text || ''}>
            <textarea
              className={isFocused && !noValidation && !isValid ? 'input--invalid' : ''}
              placeholder={placeholder}
              id={id}
              value={value}
              onFocus={focusHandler}
              onChange={onTextareaChange}
            />
          </TooltipContainer>
        </>
      )}

      {(inputElementType === 'input' || !inputElementType) && (
        <>
          <TooltipContainer color="#911a1a" text={tooltip?.text || ''}>
            <input
              className={isFocused && !noValidation && !isValid ? 'input--invalid' : ''}
              type={type}
              id={id}
              placeholder={placeholder}
              value={value}
              onFocus={focusHandler}
              onChange={onInputChange}
            />
          </TooltipContainer>
        </>
      )}
    </div>
  );
};

export default InputBox;
