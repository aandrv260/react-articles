import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import PageContainer from '../../components/PageContainer/PageContainer';
import { HeaderInfo } from '../../models/header';
import useQuery from '../../hooks/useQuery';
import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';

const NotePage = () => {
  const [num, setNum] = useState<number>(0);
  const navigate = useNavigate();
  const noteId = useQuery();
  const note = useSelector((state: NotesSlice) => state.notes.find(note => note.id === noteId));

  console.log(note);

  const headerInfo: HeaderInfo = {
    heading: 'The_Title',
    buttons: [
      {
        text: 'Edit',
        onClick: () => {
          setNum(prev => prev + 1);
        },
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

  const markdown = `
  # Example markdown
  <br />
  ### It works!
  `;

  return (
    <PageContainer header={headerInfo}>
      <Markdown>{markdown}</Markdown>
    </PageContainer>
  );
};

export default NotePage;
