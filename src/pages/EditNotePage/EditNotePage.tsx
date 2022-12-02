import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';
import useQuery from '../../hooks/useQuery';
import useNoteForm from '../../hooks/useNoteForm';
import { HeaderInfo } from '../../models/header';
import NoteForm from '../../components/NoteForm/NoteForm';
import { getStatusColor } from '../../utils/Form/formValidation';
import Feedback from '../../components/Feedback/Feedback';
import { generateSlug } from '../../utils/urlSlugs';
import { NoteFormButton } from '../../models/form';
import { NotesSlice } from '../../models/store';
import PageNotFound from '../PageNotFound/PageNotFound';

const EditNotePage = () => {
  const navigate = useNavigate();
  const query = useQuery(['id']);
  const notes = useSelector((state: NotesSlice) => state.notes);
  const curNote = notes.find(note => note.id === query?.id);
  const notePageSlug = `/note/${generateSlug(curNote?.heading || '')}?id=${curNote?.id}`;

  const { form, allTags, eventHandlers } = useNoteForm('edit', query?.id);

  if (!query?.id) return <PageNotFound />;

  const confirmEditHandler = () => {
    eventHandlers.submitForm();
    navigate(notePageSlug);
  };

  const headerInfo: HeaderInfo = {
    heading: `Edit ${curNote?.heading || ''}`,
    buttons: [
      {
        text: 'Confirm',
        designStyle: 'full',
        onClick: confirmEditHandler,
      },

      {
        text: 'Back',
        designStyle: 'full',
        onClick: () => void navigate(notePageSlug),
      },
    ],
  };

  const formButtons: NoteFormButton[] = [
    { text: 'Confirm', designStyle: 'full', onClick: confirmEditHandler },
    { text: 'Reset', designStyle: 'outline', onClick: eventHandlers.resetForm },
  ];

  return (
    <>
      <Feedback
        status={getStatusColor(form.status)}
        buttons={[]}
        message={form.feedback.submitMessage}
        isVisible={form.feedback.isVisible}
        onClose={eventHandlers.hideFeedback}
      />

      <PageContainer header={headerInfo}>
        <NoteForm
          form={form}
          buttons={formButtons}
          eventHandlers={eventHandlers}
          allTags={allTags}
        />
      </PageContainer>
    </>
  );
};

export default EditNotePage;
