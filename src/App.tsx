import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import useLocalStorage from './hooks/useLocalStorage';
import AllNotesPage from './pages/AllNotes/AllNotesPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import NotePage from './pages/NotePage/NotePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { getDataFromLocalStorage } from './store';

const App = () => {
  // const { storage } = useLocalStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getDataFromLocalStorage());
  }, [dispatch]);
  console.log('App.js');
  // console.log('IN App.js. Fetched from LocalStorage: ', storage);
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AllNotesPage />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/new" element={<NewNotePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
