import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import PageContainer from '../../components/PageContainer/PageContainer';
import { HeaderInfo } from '../../models/header';
import useQuery from '../../hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';
import PageNotFound from '../PageNotFound/PageNotFound';
import { writeStateToLocalStorageAfterNoteDelete } from '../../store/notesActions';
import Modal from '../../components/Modal/Modal';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import { generateSlug } from '../../utils/urlSlugs';

const NotePage = () => {
  const [deleteConfirmModalIsVisible, setDeleteConfirmModalIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const noteId = useQuery(['id']);
  const dispatch = useDispatch();

  const note = useSelector((state: NotesSlice) => state.notes.find(note => note.id === noteId?.id));

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
        onClick: () => {
          navigate(`/note/${generateSlug(note.heading)}/edit?id=${note.id}`);
        },
      },

      {
        text: 'Delete',
        isRed: true,
        designStyle: 'outline',
        onClick: () => {
          setDeleteConfirmModalIsVisible(true);
        },
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

  const closeModalHandler = () => setDeleteConfirmModalIsVisible(false);

  const deleteConfirmHandler = () => {
    dispatch<any>(writeStateToLocalStorageAfterNoteDelete(noteId.id));
    navigate('/');
  };

  return (
    <>
      <Modal isVisible={deleteConfirmModalIsVisible}>
        <ConfirmDelete onClose={closeModalHandler} onConfirm={deleteConfirmHandler} />
      </Modal>

      <PageContainer header={headerInfo}>
        <Markdown>{markdown}</Markdown>
      </PageContainer>
    </>
  );
};

export default NotePage;
