import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';
import { reverseSearchLocation, ReverseSearchParams, searchLocation } from 'lib/api/geocode';

export const geocodeKeys = createQueryKeys('geocode', {
  reverse: (params?: ReverseSearchParams) => params ?? {},
  search: (query?: string) => ({ query })
});

export const useReverseSearchLocation = (params?: ReverseSearchParams) => (
  useQuery(
    geocodeKeys.reverse(params),
    () => reverseSearchLocation(params),
    { enabled: !!params }
  )
);

export const useSearchLocation = (query?: string) => (
  useQuery(
    geocodeKeys.search(query),
    () => searchLocation(query),
    { enabled: !!query }
  )
)