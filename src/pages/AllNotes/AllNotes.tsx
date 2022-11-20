import React from 'react';
import Container from '../../components/Container/Container';
import FilterNotes from '../../components/FilterNotes/FilterNotes';
import Header from '../../components/Header/Header';
import Notes from '../../components/Notes/Notes';
import { ButtonClickMouseEvent } from '../../models/form';
import { NotesInfo } from '../../models/notes';

const testNotes: NotesInfo = [
  {
    heading: 'Centering a div',
    tags: ['CSS', 'HTML'],
    isFeatured: true,
  },

  {
    heading: 'Centering a div',
    tags: ['CSS', 'HTML'],
  },

  {
    heading: 'Centering a div',
    tags: ['CSS', 'HTML'],
  },
];

const AllNotes = () => {
  const headerBtnClickHandler = (event: ButtonClickMouseEvent) => {
    console.log();
  };

  return (
    <>
      <Header heading="All Notes" button={{ text: 'Create', onClick: headerBtnClickHandler }} />

      <main>
        <FilterNotes />
        <Notes notes={testNotes} />
      </main>
    </>
  );
};

export default AllNotes;
