import { ReverseSearchResponse } from 'lib/api/geocode';
import { HourlyWeatherData, WeatherCode, WeatherResponse } from 'lib/api/weather';
import { assertUnreachable } from 'lib/utils/types';
import { isThisHour, format } from 'date-fns';

import clearDay from '@bybas/weather-icons/production/fill/svg/clear-day.svg';
import clearNight from '@bybas/weather-icons/production/fill/svg/clear-night.svg';
import partlyCloudyDay from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day.svg';
import partlyCloudyNight from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night.svg';
import overcastDay from '@bybas/weather-icons/production/fill/svg/overcast-day.svg';
import overcastNight from '@bybas/weather-icons/production/fill/svg/overcast-night.svg';
import fogDay from '@bybas/weather-icons/production/fill/svg/fog-day.svg';
import fogNight from '@bybas/weather-icons/production/fill/svg/fog-night.svg';
import drizzle from '@bybas/weather-icons/production/fill/svg/drizzle.svg';
import extremeDrizzle from '@bybas/weather-icons/production/fill/svg/extreme-drizzle.svg';
import overcastDrizzle from '@bybas/weather-icons/production/fill/svg/overcast-drizzle.svg';
import overcastSleet from '@bybas/weather-icons/production/fill/svg/overcast-sleet.svg';
import sleet from '@bybas/weather-icons/production/fill/svg/sleet.svg';
import partlyCloudyDayRain from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day-rain.svg';
import partlyCloudyNightRain from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night-rain.svg';
import overcastDayRain from '@bybas/weather-icons/production/fill/svg/overcast-day-rain.svg';
import overcastNightRain from '@bybas/weather-icons/production/fill/svg/overcast-night-rain.svg';
import extremeDayRain from '@bybas/weather-icons/production/fill/svg/extreme-day-rain.svg';
import extremeNightRain from '@bybas/weather-icons/production/fill/svg/extreme-night-rain.svg';
import partlyCloudyDaySnow from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day-snow.svg';
import partlyCloudyNightSnow from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night-snow.svg';
import overcastDaySnow from '@bybas/weather-icons/production/fill/svg/overcast-day-snow.svg';
import overcastNightSnow from '@bybas/weather-icons/production/fill/svg/overcast-night-snow.svg';
import extremeDaySnow from '@bybas/weather-icons/production/fill/svg/extreme-day-snow.svg';
import extremeNightSnow from '@bybas/weather-icons/production/fill/svg/extreme-night-snow.svg';
import hail from '@bybas/weather-icons/production/fill/svg/hail.svg';
import thunderstorms from '@bybas/weather-icons/production/fill/svg/thunderstorms.svg';
import thunderstormsSnow from '@bybas/weather-icons/production/fill/svg/thunderstorms-snow.svg';
import thunderstormsExtremeSnow from '@bybas/weather-icons/production/fill/svg/thunderstorms-extreme-snow.svg';
import notAvailable from '@bybas/weather-icons/production/fill/svg/not-available.svg';

export const formatLocationText = (address?: ReverseSearchResponse['address']) => {
  if (!address) return undefined;

  if (address.amenity) return address.amenity;

  if (address.road && address.house_number && address.city) {
    return `${address.road} ${address.house_number}, ${address.city}`
  }

  if (address.road && address.city) {
    return `${address.road}, ${address.city}`
  }

  if (address.city) return address.city;

  return undefined;
}

export const getWeatherIcon = (weatherCode: WeatherCode | null, variant: 'day' | 'night' = 'day') => {
  switch (weatherCode) {
    case WeatherCode.CLEAR_SKY: 
    case WeatherCode.MAINLY_CLEAR:
      return variant === 'day' ? clearDay : clearNight;

    case WeatherCode.PARTLY_CLOUDY:
      return variant === 'day' ? partlyCloudyDay : partlyCloudyNight;

    case WeatherCode.OVERCAST:
      return variant === 'day' ? overcastDay : overcastNight;

    case WeatherCode.FOG:
    case WeatherCode.RIME_FOG:
      return variant === 'day' ? fogDay : fogNight;

    case WeatherCode.LIGHT_DRIZZLE:
      return drizzle;

    case WeatherCode.MODERATE_DRIZZLE:
      return overcastDrizzle;

    case WeatherCode.DENSE_DRIZZLE:
      return extremeDrizzle;

    case WeatherCode.LIGHT_FREEZING_RAIN:
    case WeatherCode.LIGHT_FREEZING_DRIZZLE:
      return sleet;

    case WeatherCode.HEAVY_FREEZING_RAIN:
    case WeatherCode.DENSE_FREEZING_DRIZZLE:
      return overcastSleet;

    case WeatherCode.SLIGHT_RAIN_SHOWERS:
    case WeatherCode.SLIGHT_RAIN:
      return variant === 'day' ? partlyCloudyDayRain : partlyCloudyNightRain;

    case WeatherCode.MODERATE_RAIN_SHOWERS:
    case WeatherCode.MODERATE_RAIN:
      return variant === 'day' ? overcastDayRain : overcastNightRain;

    case WeatherCode.VIOLENT_RAIN_SHOWERS:
    case WeatherCode.HEAVY_RAIN:
      return variant === 'day' ? extremeDayRain : extremeNightRain;

    case WeatherCode.SLIGHT_SNOW_SHOWERS:
    case WeatherCode.SLIGHT_SNOW:
      return variant === 'day' ? partlyCloudyDaySnow : partlyCloudyNightSnow;

    case WeatherCode.MODERATE_SNOW:
      return variant === 'day' ? overcastDaySnow : overcastNightSnow;

    case WeatherCode.HEAVY_SNOW_SHOWERS:
    case WeatherCode.HEAVY_SNOW:
      return variant === 'day' ? extremeDaySnow : extremeNightSnow;

    case WeatherCode.SNOW_GRAINS:
      return hail;

    case WeatherCode.THUNDERSTORM:
      return thunderstorms;

    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL:
      return thunderstormsSnow;

    case WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL:
      return thunderstormsExtremeSnow;

    case null:
      return notAvailable;
  }

  return assertUnreachable(weatherCode, 'Not all symbols are checked');
}

export const getWeatherDescription = (weatherCode: WeatherCode | null) => {
  switch (weatherCode) {
    case WeatherCode.CLEAR_SKY:
    case WeatherCode.MAINLY_CLEAR:
      return 'Clear sky';

    case WeatherCode.PARTLY_CLOUDY:
    case WeatherCode.OVERCAST:
      return 'Cloudy';

    case WeatherCode.FOG:
    case WeatherCode.RIME_FOG:
      return 'Foggy';

    case WeatherCode.LIGHT_DRIZZLE:
    case WeatherCode.MODERATE_DRIZZLE:
    case WeatherCode.DENSE_DRIZZLE:
    case WeatherCode.LIGHT_FREEZING_DRIZZLE:
    case WeatherCode.DENSE_FREEZING_DRIZZLE:
      return 'Dreezling rain';

    case WeatherCode.SLIGHT_RAIN:
    case WeatherCode.MODERATE_RAIN:
    case WeatherCode.HEAVY_RAIN:
    case WeatherCode.LIGHT_FREEZING_RAIN:
    case WeatherCode.HEAVY_FREEZING_RAIN:
    case WeatherCode.SLIGHT_RAIN_SHOWERS:
    case WeatherCode.MODERATE_RAIN_SHOWERS:
    case WeatherCode.VIOLENT_RAIN_SHOWERS:
      return 'Raining';

    case WeatherCode.SLIGHT_SNOW:
    case WeatherCode.MODERATE_SNOW:
    case WeatherCode.HEAVY_SNOW:
    case WeatherCode.SNOW_GRAINS:
    case WeatherCode.SLIGHT_SNOW_SHOWERS:
    case WeatherCode.HEAVY_SNOW_SHOWERS:
      return 'Snowing';

    case WeatherCode.THUNDERSTORM:
    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL:
    case WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL:
      return 'Thunderstorms';

    case null:
      return undefined;
  }

  return assertUnreachable(weatherCode, 'Not all symbols are checked');
}

export const transformCurrentWeather = (weather?: WeatherResponse) => {
  if (!weather) return undefined;

  const currentWeatherIndex = weather.hourly.time.findIndex(date => isThisHour(new Date(date)));
  if (currentWeatherIndex === -1) return undefined;

  return Object.fromEntries(
    Object.entries(weather.hourly).map(([key, values]) => [key, values[currentWeatherIndex]])
  ) as HourlyWeatherData
}

export const transformWeeklyWeather = (weather: WeatherResponse, hours: number[]) => {
  const weatherMap = new Map<string, Array<HourlyWeatherData>>();
  const keys = Object.keys(weather.hourly) as Array<keyof WeatherResponse['hourly']>;

  for (let i = 0; i < weather.hourly.time.length; ++i) {
    const time = weather.hourly.time[i];
    if (!hours.includes(new Date(time).getHours())) continue;

    const date = format(new Date(time), 'yyyy-MM-dd');
    if (!weatherMap.has(date)) weatherMap.set(date, []);

    const hourlyWeather = Object.fromEntries(keys.map(key => [key, weather.hourly[key][i]])) as HourlyWeatherData;
    weatherMap.get(date)?.push(hourlyWeather);
  }

  return Object.fromEntries(weatherMap.entries());
}