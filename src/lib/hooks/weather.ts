import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';
import { FetchWeatherParams, fetchWeather } from 'lib/api/weather';

// type CustomQueryHookOptions<TData> = Omit<UseQueryOptions<TData, HTTPError, TData, any>, 'queryKey' | 'queryFn'>;

export const weatherKeys = createQueryKeys('weather', {
  byLocation: (params?: FetchWeatherParams) => params ?? {}
});

export const useWeather = (params?: FetchWeatherParams) => (
  useQuery(
    weatherKeys.byLocation(params),
    () => fetchWeather(params),
    { enabled: !!params }
  )
);