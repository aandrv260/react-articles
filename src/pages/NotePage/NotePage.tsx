import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import PageContainer from '../../components/PageContainer/PageContainer';
import { HeaderInfo } from '../../models/header';
import useQuery from '../../hooks/useQuery';
import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';
import PageNotFound from '../PageNotFound/PageNotFound';

const NotePage = () => {
  const navigate = useNavigate();
  const noteId = useQuery();
  const note = useSelector((state: NotesSlice) => state.notes.find(note => note.id === noteId));
  const markdown: string = useMemo(() => {
    return note?.description || '';
  }, [note]);

  if (!note || !noteId) return <PageNotFound />;

  const headerInfo: HeaderInfo = {
    heading: note.heading,
    tags: note.tags,
    buttons: [
      {
        text: 'Edit',
        onClick: () => {},
      },

      {
        text: 'Delete',
        onClick: () => {},
      },

      {
        text: 'Back',
        designStyle: 'outline',
        onClick: () => {
          navigate('..');
        },
      },
    ],
  };

  return (
    <PageContainer header={headerInfo}>
      <Markdown>{markdown}</Markdown>
    </PageContainer>
  );
};

export default NotePage;
