import { createQueryKeys } from '@lukemorales/query-key-factory';
import { UseQueryOptions } from '@tanstack/react-query';
import { ReverseSearchParams, reverseSearchLocation, searchLocation, ReverseSearchResponse } from 'lib/api/geocode';

export const geocodeKeys = createQueryKeys('geocode', {
  reverse: (params?: ReverseSearchParams) => params ?? {},
  search: (query?: string) => ({ query })
});

export const reverseSearchLocationQuery = (params?: ReverseSearchParams): UseQueryOptions<ReverseSearchResponse> => ({
  queryKey: geocodeKeys.reverse(params),
  queryFn: () => reverseSearchLocation(params),
});

export const searchLocationQuery = (query?: string) => ({
  queryKey: geocodeKeys.search(query),
  queryFn: () => searchLocation(query),
})