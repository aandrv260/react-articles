import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 *  Reads the ***query*** parameters
 * @returns The note id which is read from the query parameters
 */
const useQuery = () => {
  const { search } = useLocation();
  const query = search?.split('?id=')[1]?.split('&')[0];

  return useMemo(() => query, [query]);
};

export default useQuery;
