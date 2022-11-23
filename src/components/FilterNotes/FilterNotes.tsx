import InputBox from '../InputBox/InputBox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import useFilter from '../../hooks/useFilter';

const FilterNotes = () => {
  const { filters, multiSelectValue, titleChangeHandler, tagsChangeHandler } = useFilter();

  return (
    <Form>
      <FormGroup>
        <InputBox
          id="title-filter"
          type={'text'}
          label="Title"
          value={filters.heading}
          onChange={titleChangeHandler}
        />

        <InputBox
          id="tag-filter"
          type={'text'}
          label="Tag"
          multiSelectValue={multiSelectValue}
          onMultiSelectChange={tagsChangeHandler}
          inputElementType="multi-select"
        />
      </FormGroup>
    </Form>
  );
};

export default FilterNotes;
