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
import { getStatusColor } from '../../utils/formValidation';

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
    hideFeedback,
    // changeFeedbackVisibility,
  } = useNewNote();

  console.log('newNoteForm.formIsValid', newNoteForm.formIsValid);

  const navigate = useNavigate();
  const dispatchNote = useDispatch();

  const createNoteHandler = useCallback(
    (event: ButtonClickMouseEvent) => {
      dispatchNote<any>(writeStateToLocalStorage(newNoteForm));
      clearForm();
      setNoteStatusToCreated();
      // changeFeedbackVisibility(true);
    },
    [dispatchNote, newNoteForm, setNoteStatusToCreated, clearForm]
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
        status={getStatusColor(newNoteForm.status)}
        buttons={[]}
        message={newNoteForm.feedback.message}
        isVisible={newNoteForm.feedback.isVisible}
        onClose={hideFeedback}
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
