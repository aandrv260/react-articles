import { useState } from 'react';
import InputBox from '../InputBox/InputBox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import { NoteTagInfo } from '../../models/noteTags';
import useTag from '../../hooks/useTag';

const FilterNotes = () => {
  const [title, setTitle] = useState<string>('');
  const { multiSelectValue, setTagsFiltered } = useTag();

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <Form>
      <FormGroup>
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
          multiSelectValue={multiSelectValue}
          onMultiSelectChange={setTagsFiltered}
          inputElementType="multi-select"
        />
      </FormGroup>
    </Form>
  );
};

export default FilterNotes;
