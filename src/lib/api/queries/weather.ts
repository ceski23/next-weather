import { createQueryKeys } from '@lukemorales/query-key-factory';
import { UseQueryOptions } from '@tanstack/react-query';
import { fetchWeather, FetchWeatherParams, WeatherErrorResponse, WeatherResponse } from 'lib/api/weather';

export const weatherKeys = createQueryKeys('weather', {
  byLocation: (params?: FetchWeatherParams) => params ?? {}
});

export const weatherQuery = (params?: FetchWeatherParams): UseQueryOptions<WeatherResponse, WeatherErrorResponse> => ({
  queryKey: weatherKeys.byLocation(params),
  queryFn: () => fetchWeather(params),
});