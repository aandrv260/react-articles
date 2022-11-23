import React from 'react';
// import Container from '../../components/Container/Container';
import PageContainer from '../../components/PageContainer/PageContainer';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Notes from '../../components/Notes/Notes';
import { NotesInfo } from '../../models/notes';
import { HeaderInfo } from '../../models/header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';

// const testNotes: NotesInfo = [
//   {
//     heading: 'CSS Selectors',
//     isFeatured: false,
//     tags: [
//       {
//         label: 'CSS',
//         id: 1,
//       },

//       {
//         label: 'HTML',
//         id: 2,
//       },

//       {
//         label: 'Selectors',
//         id: 3,
//       },
//     ],
//   },

//   {
//     heading: 'Centering a DIV',
//     isFeatured: true,
//     tags: [
//       {
//         label: 'CSS',
//         id: 1,
//       },

//       {
//         label: 'HTML',
//         id: 2,
//       },

//       {
//         label: 'Flexbox',
//         id: 3,
//       },
//     ],
//   },

//   {
//     heading: 'JS smooth scroll',
//     isFeatured: false,
//     tags: [
//       {
//         label: 'JS',
//         id: 1,
//       },

//       {
//         label: 'HTML',
//         id: 2,
//       },

//       {
//         label: 'Objects',
//         id: 3,
//       },
//     ],
//   },
// ];

const AllNotesPage = () => {
  const navigate = useNavigate();
  const notes = useSelector((state: NotesSlice) => ({
    allNotes: state.notes,
    filteredNotes: state.filteredNotes,
  }));
  console.log(notes.filteredNotes);
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
      <Notes notes={notes.filteredNotes} />
    </PageContainer>
  );
};

export default AllNotesPage;
