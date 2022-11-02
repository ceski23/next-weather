import { ReverseSearchResponse } from 'lib/api/geocode';
import { SymbolCode } from 'lib/api/weather';

import ClearDay from '@bybas/weather-icons/production/fill/svg/clear-day.svg';
import Cloudy from '@bybas/weather-icons/production/fill/svg/cloudy.svg';
import PartlyCloudy from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day.svg';
import ThunderstormsRain from '@bybas/weather-icons/production/fill/svg/thunderstorms-rain.svg';

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

// const assertUnreachable = (_: never, message: string): never => {
//   throw new Error(message);
// }

export const getWeatherIcon = (symbolCode?: string) => {
  if (!symbolCode) return undefined;

  switch (symbolCode) {
    case 'clearsky_day': return ClearDay;
    case 'cloudy': return Cloudy;
    case 'partly_cloudy': return PartlyCloudy;
    case 'thunderstorms_rain': return ThunderstormsRain;
    
    default:
      return undefined;
  }

  // return assertUnreachable(symbolCode, 'Not all symbols are checked');
}

export const getWeatherDescription = (symbolCode?: SymbolCode) => {
  if (!symbolCode) return undefined;

  switch (symbolCode) {
    case 'clearsky_day':
    case 'clearsky_night':
    case 'clearsky_polartwilight':
      return 'Clear sky';
    
    case 'cloudy':
      return 'Cloudy';

    case 'fair_day':
    case 'fair_night':
    case 'fair_polartwilight':
      return 'Fair';
    
    case 'fog':
      return 'Fog';
    
    case 'heavyrain':
      return 'Heavy rain';
    
    case 'heavyrainandthunder':
      return 'Heavy rain and thunder';
    
    case 'heavyrainshowers_day':
    case 'heavyrainshowers_night':
    case 'heavyrainshowers_polartwilight':
      return 'Heavy rain showers';
    
    case 'heavyrainshowersandthunder_day':
    case 'heavyrainshowersandthunder_night':
    case 'heavyrainshowersandthunder_polartwilight':
      return 'Heavy rain showers and thunder';
    
    case 'heavysleet':
      return 'Heavy sleet';
    
    default:
      return symbolCode;
  }

  // return assertUnreachable(symbolCode, 'Not all symbols are checked');
}