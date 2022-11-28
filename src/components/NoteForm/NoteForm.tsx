import { InputChangeHandler, TextareaChangeHandler } from '../../models/form';
import { ButtonStyles } from '../../models/header';
import { NoteTagInfo } from '../../models/noteTags';
import Button, { ButtonClickHandler } from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Checkbox from '../Checkbox/Checkbox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import InputBox from '../InputBox/InputBox';

interface NoteFormButton {
  text: string;
  designStyle?: ButtonStyles;
  onClick: ButtonClickHandler;
}

interface NoteFormProps {
  title: {
    value: string;
    onInputChange: InputChangeHandler;
  };

  tagsInput: {
    options: NoteTagInfo[];
    multiSelectValue: NoteTagInfo[];
    onChange: (data: NoteTagInfo[]) => void;
  };

  checkbox: {
    checked: boolean;
    onChange: InputChangeHandler;
  };

  description: {
    value: string;
    onChange: TextareaChangeHandler;
  };

  buttons: NoteFormButton[];
}

const NoteForm = (props: NoteFormProps) => {
  const { title, tagsInput, checkbox, description, buttons } = props;

  return (
    <>
      <Form hasGroups>
        <FormGroup>
          <InputBox
            id="note-title"
            type={'text'}
            label="Title"
            value={title.value}
            onInputChange={title.onInputChange}
          />

          <InputBox
            id="note-tags"
            label="Tags"
            options={tagsInput.options}
            multiSelectValue={tagsInput.multiSelectValue}
            onMultiSelectChange={tagsInput.onChange}
            inputElementType="multi-select"
          />
        </FormGroup>

        <Checkbox checked={!!checkbox.checked} onChange={checkbox.onChange} label="Featured" />

        <InputBox
          id="note-description"
          type={'text'}
          label="Description"
          value={description.value}
          onTextareaChange={description.onChange}
          inputElementType="textarea"
        />
      </Form>

      <ButtonGroup>
        {buttons.map(button => (
          <Button
            type="button"
            designStyle={button.designStyle}
            onClick={button.onClick}
            key={Math.random()}
          >
            {button.text}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default NoteForm;

/* <FormGroup>
        <InputBox
          id="note-title"
          type={'text'}
          label="Title"
          value={newNoteForm.heading}
          onInputChange={headingChangeHandler}
        />

        <InputBox
          id="note-tags"
          label="Tags"
          options={allTags}
          multiSelectValue={newNoteForm.tags}
          onMultiSelectChange={tagsChangeHandler}
          inputElementType="multi-select"
        />
      </FormGroup>

      <Checkbox
        checked={!!newNoteForm.isFeatured}
        onChange={checkboxChangeHandler}
        label="Featured"
      />

      <InputBox
        id="note-description"
        type={'text'}
        label="Description"
        value={newNoteForm.description}
        onTextareaChange={descriptionChangeHandler}
        inputElementType="textarea"
      /> */
