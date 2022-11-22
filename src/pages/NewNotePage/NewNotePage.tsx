import { useMemo, useCallback } from 'react';
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
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';

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

  const changeTagsHandler = (tags: NoteTagInfo[]) => {
    dispatchForm({ type: 'CHANGE_TAGS', tags });
  };

  const clearFormHandler = () => {
    dispatchForm({ type: 'CLEAR_FORM' });
  };

  const createNoteHandler = useCallback(
    (event: ButtonClickMouseEvent) => {
      dispatchNote(notesActions.create(newNoteForm));
    },
    [dispatchNote, newNoteForm]
  );

  const headerInfo: HeaderInfo = useMemo(
    () => ({
      heading: 'New note',
      buttons: [
        {
          text: 'Add',
          onClick: createNoteHandler,
        },

        {
          text: 'Back',
          designStyle: 'outline',
          onClick: (event: ButtonClickMouseEvent) => navigate('/'),
        },
      ],
    }),
    [navigate, createNoteHandler]
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
            onMultiSelectChange={changeTagsHandler}
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

      <ButtonGroup>
        <Button type="button" onClick={createNoteHandler}>
          Create
        </Button>

        <Button type="button" designStyle="outline" onClick={clearFormHandler}>
          Clear
        </Button>
      </ButtonGroup>
    </PageContainer>
  );
};

export default NewNotePage;
