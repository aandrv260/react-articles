import { FormEventHandlers, NoteFormButton, NoteFormState } from '../../models/form';
import { NoteTagInfo } from '../../models/noteTags';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Checkbox from '../Checkbox/Checkbox';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import InputBox from '../InputBox/InputBox';

interface NoteFormProps {
  form: NoteFormState;
  eventHandlers: FormEventHandlers;
  // title: {
  //   value: string;
  //   onInputChange: InputChangeHandler;
  // };

  // tagsInput: {
  //   options: NoteTagInfo[];
  //   multiSelectValue: NoteTagInfo[];
  //   onChange: (data: NoteTagInfo[]) => void;
  // };

  // checkbox: {
  //   checked: boolean;
  //   onChange: InputChangeHandler;
  // };

  // description: {
  //   value: string;
  //   onChange: TextareaChangeHandler;
  // };

  buttons: NoteFormButton[];
  allTags: NoteTagInfo[];
}

const NoteForm = (props: NoteFormProps) => {
  const { form, eventHandlers, buttons, allTags } = props;

  return (
    <>
      <Form hasGroups>
        <FormGroup>
          <InputBox
            id="note-title"
            type={'text'}
            label="Title"
            value={form.heading}
            onInputChange={eventHandlers.headingChange}
            tooltip={{ text: 'My tooltip', color: '#333' }}
          />

          <InputBox
            id="note-tags"
            label="Tags"
            options={allTags}
            multiSelectValue={form.tags}
            onMultiSelectChange={eventHandlers.tagsChange}
            inputElementType="multi-select"
          />
        </FormGroup>

        <Checkbox
          checked={!!form.isFeatured}
          onChange={eventHandlers.checkboxChange}
          label="Featured"
        />

        <InputBox
          id="note-description"
          type={'text'}
          label="Description"
          value={form.description}
          onTextareaChange={eventHandlers.descriptionChange}
          inputElementType="textarea"
          tooltip={{ text: 'My tooltip', color: '#333' }}
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
