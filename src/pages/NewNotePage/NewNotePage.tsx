import { useMemo, useCallback, useState } from 'react';
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
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Feedback from '../../components/Feedback/Feedback';

const NewNotePage = () => {
  const {
    newNoteForm,
    headingChangeHandler,
    tagsChangeHandler,
    checkboxChangeHandler,
    clearFormHandler,
    descriptionChangeHandler,
    isNoteCreatedChangeHandler,
    multiSelectValue,
    feedbackVisibilityChangeHandler,
  } = useNewNote();

  const navigate = useNavigate();
  const dispatchNote = useDispatch();

  const createNoteHandler = useCallback(
    (event: ButtonClickMouseEvent) => {
      dispatchNote(notesActions.create(newNoteForm));
      isNoteCreatedChangeHandler();
      feedbackVisibilityChangeHandler(true);
      // setIsNoteCreated(true);
    },
    [dispatchNote, newNoteForm, isNoteCreatedChangeHandler, feedbackVisibilityChangeHandler]
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
    <>
      <Feedback
        status="success"
        buttons={[]}
        message="Note created"
        isVisible={!!newNoteForm.isFeedbackVisible}
        setVisibility={feedbackVisibilityChangeHandler}
      />

      <PageContainer header={headerInfo}>
        <Form hasGroups>
          <FormGroup>
            <InputBox
              id="note-title"
              type={'text'}
              label="Title"
              value={newNoteForm.heading}
              onChange={headingChangeHandler}
            />

            <InputBox
              id="note-tags"
              label="Tags"
              multiSelectValue={multiSelectValue}
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
    </>
  );
};

export default NewNotePage;
