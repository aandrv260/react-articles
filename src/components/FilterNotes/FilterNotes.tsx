import React, { useReducer, useState } from 'react';
import { InputChangeEvent } from '../../models/form';
import InputBox from '../InputBox/InputBox';
import styles from './FilterNotes.module.scss';

const FilterNotes = () => {
  const [title, setTitle] = useState<string>('3');
  // const [title, setTitle] = useState<string>('3');

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <form className={`${styles['form-filter']}`}>
      <InputBox
        id="title-filter"
        type={'text'}
        label="Title"
        value={title}
        onChange={titleChangeHandler}
      />

      <InputBox
        id="tag-filter"
        type={'text'}
        label="Tag"
        value={title}
        onChange={titleChangeHandler}
      />
    </form>
  );
};

export default FilterNotes;
