import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import AllNotesPage from './pages/AllNotes/AllNotesPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AllNotesPage />} />
        <Route path="/new" element={<NewNotePage />} />
      </Routes>
    </Container>
  );
}

export default App;
