import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';
import Form from '../../components/Form/Form';
import InputBox from '../../components/InputBox/InputBox';
import FormGroup from '../../components/FormGroup/FormGroup';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';

import { ButtonClickMouseEvent } from '../../models/form';
import { HeaderInfo } from '../../models/header';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Feedback from '../../components/Feedback/Feedback';
// import { writeStateToLocalStorage } from '../../store/notesActions';
import { getStatusColor } from '../../utils/Form/formValidation';
import NoteForm from '../../components/NoteForm/NoteForm';
import useNoteForm from '../../hooks/useNoteForm';

const NewNotePage = () => {
  const {
    form: newNoteForm,
    headingChangeHandler,
    tagsChangeHandler,
    checkboxChangeHandler,
    clearForm,
    submitForm: createNote,
    descriptionChangeHandler,
    allTags,
    hideFeedback,
  } = useNoteForm('create');

  const navigate = useNavigate();

  const headerInfo: HeaderInfo = useMemo(
    () => ({
      heading: 'New note',
      buttons: [
        {
          text: 'Add',
          onClick: () => {
            createNote();
          },
        },

        {
          text: 'Back',
          designStyle: 'outline',
          onClick: () => navigate('/'),
        },
      ],
    }),
    [navigate, createNote]
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
        <NoteForm
          title={{ value: newNoteForm.heading, onInputChange: headingChangeHandler }}
          tagsInput={{
            multiSelectValue: newNoteForm.tags,
            onChange: tagsChangeHandler,
            options: allTags,
          }}
          checkbox={{ checked: !!newNoteForm?.isFeatured, onChange: checkboxChangeHandler }}
          description={{ value: newNoteForm.description, onChange: descriptionChangeHandler }}
          buttons={[
            { text: 'Create', onClick: createNote },
            { text: 'Clear', onClick: clearForm, designStyle: 'outline' },
          ]}
        />
      </PageContainer>
    </>
  );
};

export default NewNotePage;
