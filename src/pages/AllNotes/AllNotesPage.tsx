import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Notes from '../../components/Notes/Notes';

import { HeaderInfo } from '../../models/header';
import { NotesSlice } from '../../models/store';

const AllNotesPage = () => {
  const navigate = useNavigate();
  const notes = useSelector((state: NotesSlice) => state.filteredNotes);

  const headerInfo: HeaderInfo = {
    heading: 'All Notes',
    buttons: [
      {
        text: 'Create',
        onClick: () => navigate('/new'),
      },
    ],
  };

  return (
    <PageContainer header={headerInfo}>
      <FilterNotes />
      <Notes notes={notes} />
    </PageContainer>
  );
};

export default AllNotesPage;
