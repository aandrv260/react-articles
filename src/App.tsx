import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import AllNotesPage from './pages/AllNotes/AllNotesPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import NotePage from './pages/NotePage/NotePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { getDataFromLocalStorage } from './store/notesActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getDataFromLocalStorage());
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<AllNotesPage />} />
        <Route path="/note/:title" element={<NotePage />} />
        <Route path="/new-note" element={<NewNotePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
