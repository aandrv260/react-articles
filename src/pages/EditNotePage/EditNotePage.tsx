import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import useQuery from '../../hooks/useQuery';
import useNoteForm from '../../hooks/useNoteForm';
import { HeaderInfo } from '../../models/header';
import NoteForm from '../../components/NoteForm/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { notesActions, writeStateToLocalStorageAfterNoteEdit } from '../../store/notesActions';
import { getStatusColor } from '../../utils/Form/formValidation';
import Feedback from '../../components/Feedback/Feedback';
import { generateSlug } from '../../utils/urlSlugs';
import { NoteFormState } from '../../models/form';
import { NotesSlice } from '../../models/store';

const EditNotePage = () => {
  const navigate = useNavigate();
  const query = useQuery(['id']);
  const notes = useSelector((state: NotesSlice) => state.notes);
  const curNote = notes.find(note => note.id === query?.id);
  const notePageSlug = `/note/${generateSlug(curNote?.heading || '')}?id=${curNote?.id}`;
  console.log(curNote);
  // TODO: Pass the note object directly into the useNoteForm hook instead of  the ID
  const {
    form,
    allTags,
    checkboxChangeHandler,
    descriptionChangeHandler,
    headingChangeHandler,
    hideFeedback,
    resetEditForm,
    submitForm: editForm,
    tagsChangeHandler,
  } = useNoteForm('edit', query?.id);

  const headerInfo: HeaderInfo = {
    heading: `Edit ${curNote?.heading || ''}`,
    buttons: [
      {
        text: 'Confirm',
        designStyle: 'full',
        onClick: editForm,
      },

      {
        text: 'Back',
        designStyle: 'full',
        onClick: () => navigate(notePageSlug),
      },
    ],
  };

  return (
    <>
      <Feedback
        status={getStatusColor(form.status)}
        buttons={[]}
        message={form.feedback.message}
        isVisible={form.feedback.isVisible}
        onClose={hideFeedback}
      />

      <PageContainer header={headerInfo}>
        <NoteForm
          title={{ value: form.heading, onInputChange: headingChangeHandler }}
          tagsInput={{ multiSelectValue: form.tags, onChange: tagsChangeHandler, options: allTags }}
          checkbox={{ checked: !!form?.isFeatured, onChange: checkboxChangeHandler }}
          description={{ value: form.description, onChange: descriptionChangeHandler }}
          buttons={[
            { text: 'Confirm', designStyle: 'full', onClick: editForm },
            { text: 'Reset', designStyle: 'outline', onClick: resetEditForm },
          ]}
        />
      </PageContainer>
    </>
  );
};

export default EditNotePage;
