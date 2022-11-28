import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import { NotesSlice } from './models/store';
import AllNotesPage from './pages/AllNotesPage/AllNotesPage';
import EditNotePage from './pages/EditNotePage/EditNotePage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import NotePage from './pages/NotePage/NotePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { initialReduxState } from './store';
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
        <Route path="/note/:title">
          <Route index element={<NotePage />} />
          <Route path="edit" element={<EditNotePage />} />
        </Route>
        <Route path="/new-note" element={<NewNotePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
