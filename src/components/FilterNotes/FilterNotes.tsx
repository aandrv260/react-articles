import InputBox from '../InputBox/InputBox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import useFilter from '../../hooks/useFilter';

const FilterNotes = () => {
  const { filters, titleChangeHandler, tagsChangeHandler, allTags } = useFilter();

  return (
    <Form>
      <FormGroup>
        <InputBox
          id="title-filter"
          type={'text'}
          label="Title"
          value={filters.heading}
          onInputChange={titleChangeHandler}
          noValidation
        />

        <InputBox
          id="tag-filter"
          type={'text'}
          label="Tag"
          options={allTags}
          multiSelectValue={filters.tags}
          onMultiSelectChange={tagsChangeHandler}
          inputElementType="multi-select"
          noValidation
        />
      </FormGroup>
    </Form>
  );
};

export default FilterNotes;
