import { ReverseSearchResponse } from 'lib/api/geocode';
import { HourlyWeatherData, WeatherCode, WeatherResponse } from 'lib/api/weather';
import { assertUnreachable } from 'lib/utils/types';
import { isThisHour, format } from 'date-fns';

import ClearDay from '@bybas/weather-icons/production/fill/svg/clear-day.svg';
import ClearNight from '@bybas/weather-icons/production/fill/svg/clear-night.svg';
import PartlyCloudyDay from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day.svg';
import PartlyCloudyNight from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night.svg';
import OvercastDay from '@bybas/weather-icons/production/fill/svg/overcast-day.svg';
import OvercastNight from '@bybas/weather-icons/production/fill/svg/overcast-night.svg';
import FogDay from '@bybas/weather-icons/production/fill/svg/fog-day.svg';
import FogNight from '@bybas/weather-icons/production/fill/svg/fog-night.svg';
import Drizzle from '@bybas/weather-icons/production/fill/svg/drizzle.svg';
import ExtremeDrizzle from '@bybas/weather-icons/production/fill/svg/extreme-drizzle.svg';
import OvercastDrizzle from '@bybas/weather-icons/production/fill/svg/overcast-drizzle.svg';
import OvercastSleet from '@bybas/weather-icons/production/fill/svg/overcast-sleet.svg';
import Sleet from '@bybas/weather-icons/production/fill/svg/sleet.svg';
import PartlyCloudyDayRain from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day-rain.svg';
import PartlyCloudyNightRain from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night-rain.svg';
import OvercastDayRain from '@bybas/weather-icons/production/fill/svg/overcast-day-rain.svg';
import OvercastNightRain from '@bybas/weather-icons/production/fill/svg/overcast-night-rain.svg';
import ExtremeDayRain from '@bybas/weather-icons/production/fill/svg/extreme-day-rain.svg';
import ExtremeNightRain from '@bybas/weather-icons/production/fill/svg/extreme-night-rain.svg';
import PartlyCloudyDaySnow from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day-snow.svg';
import PartlyCloudyNightSnow from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night-snow.svg';
import OvercastDaySnow from '@bybas/weather-icons/production/fill/svg/overcast-day-snow.svg';
import OvercastNightSnow from '@bybas/weather-icons/production/fill/svg/overcast-night-snow.svg';
import ExtremeDaySnow from '@bybas/weather-icons/production/fill/svg/extreme-day-snow.svg';
import ExtremeNightSnow from '@bybas/weather-icons/production/fill/svg/extreme-night-snow.svg';
import Hail from '@bybas/weather-icons/production/fill/svg/hail.svg';
import Thunderstorms from '@bybas/weather-icons/production/fill/svg/thunderstorms.svg';
import ThunderstormsSnow from '@bybas/weather-icons/production/fill/svg/thunderstorms-snow.svg';
import ThunderstormsExtremeSnow from '@bybas/weather-icons/production/fill/svg/thunderstorms-extreme-snow.svg';
import NotAvailable from '@bybas/weather-icons/production/fill/svg/not-available.svg';

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
      return variant === 'day' ? ClearDay : ClearNight;

    case WeatherCode.PARTLY_CLOUDY:
      return variant === 'day' ? PartlyCloudyDay : PartlyCloudyNight;

    case WeatherCode.OVERCAST:
      return variant === 'day' ? OvercastDay : OvercastNight;

    case WeatherCode.FOG:
    case WeatherCode.RIME_FOG:
      return variant === 'day' ? FogDay : FogNight;

    case WeatherCode.LIGHT_DRIZZLE:
      return Drizzle;

    case WeatherCode.MODERATE_DRIZZLE:
      return OvercastDrizzle;

    case WeatherCode.DENSE_DRIZZLE:
      return ExtremeDrizzle;

    case WeatherCode.LIGHT_FREEZING_RAIN:
    case WeatherCode.LIGHT_FREEZING_DRIZZLE:
      return Sleet;

    case WeatherCode.HEAVY_FREEZING_RAIN:
    case WeatherCode.DENSE_FREEZING_DRIZZLE:
      return OvercastSleet;

    case WeatherCode.SLIGHT_RAIN_SHOWERS:
    case WeatherCode.SLIGHT_RAIN:
      return variant === 'day' ? PartlyCloudyDayRain : PartlyCloudyNightRain;

    case WeatherCode.MODERATE_RAIN_SHOWERS:
    case WeatherCode.MODERATE_RAIN:
      return variant === 'day' ? OvercastDayRain : OvercastNightRain;

    case WeatherCode.VIOLENT_RAIN_SHOWERS:
    case WeatherCode.HEAVY_RAIN:
      return variant === 'day' ? ExtremeDayRain : ExtremeNightRain;

    case WeatherCode.SLIGHT_SNOW_SHOWERS:
    case WeatherCode.SLIGHT_SNOW:
      return variant === 'day' ? PartlyCloudyDaySnow : PartlyCloudyNightSnow;

    case WeatherCode.MODERATE_SNOW:
      return variant === 'day' ? OvercastDaySnow : OvercastNightSnow;

    case WeatherCode.HEAVY_SNOW_SHOWERS:
    case WeatherCode.HEAVY_SNOW:
      return variant === 'day' ? ExtremeDaySnow : ExtremeNightSnow;

    case WeatherCode.SNOW_GRAINS:
      return Hail;

    case WeatherCode.THUNDERSTORM:
      return Thunderstorms;

    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL:
      return ThunderstormsSnow;

    case WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL:
      return ThunderstormsExtremeSnow;

    case null:
      return NotAvailable;
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