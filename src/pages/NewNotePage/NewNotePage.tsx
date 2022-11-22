import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { notesActions } from '../../store/index';

import PageContainer from '../../components/PageContainer/PageContainer';
import Form from '../../components/Form/Form';
import InputBox from '../../components/InputBox/InputBox';
import FormGroup from '../../components/FormGroup/FormGroup';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';

import useNewNote from '../../hooks/useNewNote';

import { ButtonClickMouseEvent } from '../../models/form';
import { HeaderInfo } from '../../models/header';
import { NoteTagInfo } from '../../models/noteTags';

type ChangeEvent<T> = React.ChangeEvent<T>;

const NewNotePage = () => {
  const { newNoteForm, dispatchForm } = useNewNote();
  const navigate = useNavigate();
  const dispatchNote = useDispatch();

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: 'CHANGE_HEADING', value: event.currentTarget.value });
  };

  const checkboxChangeHandler = () => {
    dispatchForm({ type: 'CHANGE_IS_FEATURED' });
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: 'CHANGE_DESCRIPTION', value: event.currentTarget.value });
  };

  const createNoteHandler = (tags: NoteTagInfo[]) => {
    dispatchForm({ type: 'CHANGE_TAGS', tags });
  };

  const headerInfo: HeaderInfo = useMemo(
    () => ({
      heading: 'New note',
      buttons: [
        {
          text: 'Add',
          onClick: (event: ButtonClickMouseEvent) => {
            dispatchNote(notesActions.create(newNoteForm));
          },
        },

        {
          text: 'Back',
          designStyle: 'outline',
          onClick: (event: ButtonClickMouseEvent) => navigate('/'),
        },
      ],
    }),
    [navigate, dispatchNote, newNoteForm]
  );

  console.log('newNoteForm', newNoteForm);

  return (
    <PageContainer header={headerInfo}>
      <Form hasGroups>
        <FormGroup>
          <InputBox
            id="note-title"
            type={'text'}
            label="Title"
            value={newNoteForm.heading}
            onChange={titleChangeHandler}
          />

          <InputBox
            id="note-tags"
            label="Tags"
            onMultiSelectChange={createNoteHandler}
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
          onChange={descriptionChangeHandler}
          inputElementType="textarea"
        />
      </Form>

      <Button type="button">Create</Button>
    </PageContainer>
  );
};

export default NewNotePage;
