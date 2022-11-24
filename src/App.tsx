import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import AllNotesPage from './pages/AllNotes/AllNotesPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import NotePage from './pages/NotePage/NotePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';

const App = () => {
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
