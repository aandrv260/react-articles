import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import AllNotes from './pages/AllNotes/AllNotes';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AllNotes />} />
        <Route path="/new" element={<h1>New note</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
