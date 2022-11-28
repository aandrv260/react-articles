import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import useQuery from '../../hooks/useQuery';
import useNoteForm from '../../hooks/useNoteForm';
import { HeaderInfo } from '../../models/header';
import NoteForm from '../../components/NoteForm/NoteForm';

const EditNotePage = () => {
  const navigate = useNavigate();
  const query = useQuery(['id']);
  const {
    form,
    allTags,
    checkboxChangeHandler,
    clearForm,
    descriptionChangeHandler,
    dispatchForm,
    headingChangeHandler,
    hideFeedback,
    submitForm,
    tagsChangeHandler,
  } = useNoteForm('edit', query?.id);

  const confirmEditHandler = () => {
    // Dispatch a Redux Action Thunk to save the edits to the specific note
    // and to save the changes to the local storage
  };

  const headerInfo: HeaderInfo = {
    heading: 'Edit {NOTE_TITLE}',
    buttons: [
      {
        text: 'Confirm',
        designStyle: 'full',
        onClick: () => {},
      },

      {
        text: 'Back',
        designStyle: 'full',
        onClick: () => navigate('/'),
      },
    ],
  };

  return (
    <PageContainer header={headerInfo}>
      <NoteForm
        title={{ value: form.heading, onInputChange: headingChangeHandler }}
        tagsInput={{ multiSelectValue: form.tags, onChange: tagsChangeHandler, options: allTags }}
        checkbox={{ checked: !!form?.isFeatured, onChange: checkboxChangeHandler }}
        description={{ value: form.description, onChange: descriptionChangeHandler }}
        buttons={[{ text: 'Confirm', designStyle: 'full', onClick: confirmEditHandler }]}
      />
    </PageContainer>
  );
};

export default EditNotePage;
