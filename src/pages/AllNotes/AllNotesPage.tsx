import React from 'react';
// import Container from '../../components/Container/Container';
import PageContainer from '../../components/PageContainer/PageContainer';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Header from '../../components/Header/Header';
import Notes from '../../components/Notes/Notes';
import { ButtonClickMouseEvent } from '../../models/form';
import { NotesInfo } from '../../models/notes';
import { HeaderInfo } from '../../models/header';
import { useNavigate } from 'react-router-dom';

const testNotes: NotesInfo = [];

const AllNotesPage = () => {
  const navigate = useNavigate();

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
      <Notes notes={testNotes} />
    </PageContainer>
  );
};

export default AllNotesPage;
