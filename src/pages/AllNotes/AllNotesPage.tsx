import React from 'react';
// import Container from '../../components/Container/Container';
import PageContainer from '../../components/PageContainer/PageContainer';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Notes from '../../components/Notes/Notes';
import { NotesInfo } from '../../models/notes';
import { HeaderInfo } from '../../models/header';
import { useNavigate } from 'react-router-dom';

const testNotes: NotesInfo = [
  {
    heading: 'CSS Selectors',
    isFeatured: false,
    tags: [
      {
        label: 'CSS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Selectors',
        id: 3,
      },
    ],
  },

  {
    heading: 'Centering a DIV',
    isFeatured: true,
    tags: [
      {
        label: 'CSS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Flexbox',
        id: 3,
      },
    ],
  },

  {
    heading: 'JS smooth scroll',
    isFeatured: false,
    tags: [
      {
        label: 'JS',
        id: 1,
      },

      {
        label: 'HTML',
        id: 2,
      },

      {
        label: 'Objects',
        id: 3,
      },
    ],
  },
];

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
