import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export const useQueryParam = (param: string, onQueryChange?: (query: string) => void) => {
  const router = useRouter();
  const queryParam = router.query[param]?.toString() ?? '';

  const setQueryParam = useCallback((val: string) => {
    const oldQuery = router.query;
    delete oldQuery[param];
    const newQuery = val.length === 0 ? oldQuery : { ...oldQuery, [param]: val };

    router.push({ query: newQuery }, undefined, { shallow: true });
  }, [param, router]);

  useEffect(() => {
    onQueryChange?.(queryParam);
  }, [onQueryChange, queryParam]);

  return [
    queryParam,
    setQueryParam
  ] as const;
}