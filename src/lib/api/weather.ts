import { format } from 'date-fns';
import kyUniversal from 'ky-universal';

const weatherApi = kyUniversal.create({
  prefixUrl: 'https://api.open-meteo.com/v1/',
  hooks: {
    beforeRequest: [
      // OpenMeteo API don't recognize serialized commas in search params
      req => new Request(req.url.replaceAll('%2C', ','), req)
    ]
  }
});

export enum WeatherCode {
  CLEAR_SKY = 0,
  MAINLY_CLEAR = 1,
  PARTLY_CLOUDY = 2,
  OVERCAST = 3,
  FOG = 45,
  RIME_FOG = 48,
  LIGHT_DRIZZLE = 51,
  MODERATE_DRIZZLE = 53,
  DENSE_DRIZZLE = 55,
  LIGHT_FREEZING_DRIZZLE = 56,
  DENSE_FREEZING_DRIZZLE = 57,
  SLIGHT_RAIN = 61,
  MODERATE_RAIN = 63,
  HEAVY_RAIN = 65,
  LIGHT_FREEZING_RAIN = 66,
  HEAVY_FREEZING_RAIN = 67,
  SLIGHT_SNOW = 71,
  MODERATE_SNOW = 73,
  HEAVY_SNOW = 75,
  SNOW_GRAINS = 77,
  SLIGHT_RAIN_SHOWERS = 80,
  MODERATE_RAIN_SHOWERS = 81,
  VIOLENT_RAIN_SHOWERS = 82,
  SLIGHT_SNOW_SHOWERS = 85,
  HEAVY_SNOW_SHOWERS = 86,
  THUNDERSTORM = 95,
  THUNDERSTORM_WITH_SLIGHT_HAIL = 96,
  THUNDERSTORM_WITH_HEAVY_HAIL = 99,
}

export interface DailyWeather {
  time: Array<string>
  apparent_temperature_min: Array<string>
  apparent_temperature_max: Array<string>
  weathercode: Array<WeatherCode>
}

export interface HourlyWeather {
  time: Array<string>
  apparent_temperature: Array<number | null>
  weathercode: Array<WeatherCode | null>
  relativehumidity_2m: Array<number | null>
  surface_pressure: Array<number | null>
  windspeed_10m: Array<number | null>
  winddirection_10m: Array<number | null>
  precipitation: Array<number | null>
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: Record<keyof HourlyWeather, string>
  hourly: HourlyWeather
}

export type HourlyWeatherData = {
  [key in keyof WeatherResponse['hourly']]: WeatherResponse['hourly'][key][number]
}

export interface WeatherErrorResponse {
  reason: string
  error: true
}

export type FetchWeatherParams = {
  latitude: number
  longitude: number
  start_date?: string
  end_date?: string
}

export const fetchWeather = (params?: FetchWeatherParams) => (
  weatherApi.get('forecast', {
    searchParams: {
      start_date: format(new Date(), 'yyyy-MM-dd'),
      end_date: format(new Date(), 'yyyy-MM-dd'),
      ...params,
      hourly: [
        'apparent_temperature',
        'weathercode',
        'relativehumidity_2m',
        'surface_pressure',
        'windspeed_10m',
        'winddirection_10m',
        'precipitation'
      ].join(','),
      timezone: 'auto',
    },
  }).then(res => res.json<WeatherResponse>())
);