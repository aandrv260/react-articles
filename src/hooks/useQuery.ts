import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isObjectEmpty } from '../utils/general';

interface LooseObject {
  [key: string]: string;
}

/**
 *  Reads the ***query*** parameters
 * @param params The parameters' names that are requested by the user
 * @returns The note parameters which are read from the query parameters OR if there are not parameters with those names, returns undefined
 */
const useQuery = (params: string[]): LooseObject | undefined => {
  const [searchParams] = useSearchParams();

  const query = params.reduce<LooseObject>((acc, cur) => {
    acc[cur] = searchParams.get(cur) || '';

    return acc;
  }, {});

  return useMemo(() => {
    if (isObjectEmpty(query)) return undefined;

    return query;
  }, [query]);
};

export default useQuery;
