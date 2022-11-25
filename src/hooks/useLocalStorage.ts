import { useEffect, useState } from 'react';
import { NotesSlice } from '../models/store';
import { initialReduxState } from '../store';
import { useDispatch } from 'react-redux';

const useLocalStorage = () => {
  const [storage, setStorage] = useState<NotesSlice | undefined>(initialReduxState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useLocalStorage');

    const storedData = localStorage.getItem('notesInfo');

    if (storedData) {
      const parsedData: NotesSlice = JSON.parse(storedData);

      // setStorage(parsedData);
      // dispatch()
    }

    // TODO: Wrap it in try..catch
  }, []);

  return {
    storage,
  };
};

export default useLocalStorage;
