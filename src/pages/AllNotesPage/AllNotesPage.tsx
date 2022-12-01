import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Notes from '../../components/Notes/Notes';

import { HeaderInfo } from '../../models/header';
import { NotesSlice } from '../../models/store';
import Modal from '../../components/Modal/Modal';
import EditTags from '../../components/EditTags/EditTags';

const AllNotesPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state: NotesSlice) => state);
  const notes = useSelector((state: NotesSlice) => state.filteredNotes);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  // For testing the Tags ids. Remove after you finish with the tags edit functionality
  console.log('state', state);

  const headerInfo: HeaderInfo = {
    heading: 'All Notes',
    buttons: [
      {
        text: 'Create',
        onClick: () => navigate('/new-note'),
      },

      {
        text: 'Edit Tags',
        designStyle: 'outline',
        onClick: () => setModalIsVisible(true),
      },
    ],
  };

  return (
    <PageContainer header={headerInfo}>
      <Modal isVisible={modalIsVisible}>
        <EditTags closeHandler={setModalIsVisible.bind(null, false)} />
      </Modal>

      <FilterNotes />
      <Notes notes={notes} />
    </PageContainer>
  );
};

export default AllNotesPage;
