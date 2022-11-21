import { useState } from 'react';
import InputBox from '../InputBox/InputBox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import { NoteTagInfo } from '../../models/noteTags';

const FilterNotes = () => {
  const [title, setTitle] = useState<string>('3');
  const [tagsFiltered, setTagsFiltered] = useState<NoteTagInfo[]>([]);

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
          multiSelectValue={tagsFiltered.map(tag => {
            return { label: tag.label, value: tag.id };
          })}
          onMultiSelectChange={setTagsFiltered}
          inputElementType="multi-select"
        />
      </FormGroup>
    </Form>
  );
};

export default FilterNotes;
