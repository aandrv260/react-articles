import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { writeStateToLocalStorage } from '../../store/notesActions';

const NewNotePage = () => {
  const {
    newNoteForm,
    headingChangeHandler,
    tagsChangeHandler,
    checkboxChangeHandler,
    clearForm,
    descriptionChangeHandler,
    setNoteStatusToCreated,
    allTags,
    changeFeedbackVisibility,
  } = useNewNote();

  const navigate = useNavigate();
  const dispatchNote = useDispatch();

  const createNoteHandler = useCallback(
    (event: ButtonClickMouseEvent) => {
      dispatchNote<any>(writeStateToLocalStorage(newNoteForm));
      clearForm();
      setNoteStatusToCreated();
      changeFeedbackVisibility(true);
    },
    [dispatchNote, newNoteForm, setNoteStatusToCreated, changeFeedbackVisibility]
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

  return (
    <>
      <Feedback
        status="success"
        buttons={[]}
        message="Note created"
        isVisible={!!newNoteForm.isFeedbackVisible}
        setVisibility={changeFeedbackVisibility}
      />

      <PageContainer header={headerInfo}>
        <Form hasGroups>
          <FormGroup>
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
          />
        </Form>

        <ButtonGroup>
          <Button type="button" onClick={createNoteHandler}>
            Create
          </Button>

          <Button type="button" designStyle="outline" onClick={clearForm}>
            Clear
          </Button>
        </ButtonGroup>
      </PageContainer>
    </>
  );
};

export default NewNotePage;
