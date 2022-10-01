import kyUniversal from 'ky-universal';

const weatherApi = kyUniversal.create({
  prefixUrl: 'https://api.met.no/',
  headers: {
    'User-Agent': 'NextWeather'
  }
});

type TimeVariant = 'day' | 'night' | 'polartwilight';
export type VariableSymbol = 'clearsky' | 'fair' | 'heavyrainshowers' | 'heavyrainshowersandthunder' | 'heavysleetshowers' |
                       'heavysleetshowersandthunder' | 'heavysnowshowers' | 'heavysnowshowersandthunder' | 'lightrainshowers' |
                       'lightrainshowersandthunder' | 'lightsleetshowers' | 'lightsnowshowers' | 'lightssleetshowersandthunder' |
                       'lightssnowshowersandthunder' | 'partlycloudy' | 'rainshowers' | 'rainshowersandthunder' | 'sleetshowers' |
                       'sleetshowersandthunder' | 'snowshowers' | 'snowshowersandthunder';
export type StaticSymbol = 'cloudy' | 'fog' | 'heavyrain' | 'heavyrainandthunder' | 'heavysleet' | 'heavysleetandthunder' | 'heavysnow' |
                     'heavysnowandthunder' | 'lightrain' | 'lightrainandthunder' | 'lightsleet' | 'lightsleetandthunder' | 'lightsnow' |
                     'lightsnowandthunder' | 'rain' | 'rainandthunder' | 'sleet' | 'sleetandthunder' | 'snow' | 'snowandthunder';

export type SymbolCode = `${VariableSymbol}_${TimeVariant}` | StaticSymbol;

interface WeatherData {
  instant: {
    details: {
      air_pressure_at_sea_level: number,
      air_temperature: number,
      cloud_area_fraction: number,
      cloud_area_fraction_high: number,
      cloud_area_fraction_low: number,
      cloud_area_fraction_medium: number,
      dew_point_temperature: number,
      fog_area_fraction: number,
      relative_humidity: number,
      ultraviolet_index_clear_sky: number,
      wind_from_direction: number,
      wind_speed: number
    }
  },
  next_12_hours: {
    summary: {
      symbol_code: SymbolCode
    }
  },
  next_1_hours: {
    summary: {
      symbol_code: SymbolCode
    },
    details: {
      precipitation_amount: number
    }
  },
  next_6_hours: {
    summary: {
      symbol_code: SymbolCode
    },
    details: {
      precipitation_amount: number,
      air_temperature_max: number,
      air_temperature_min: number
    }
  }
}

export interface WeatherResponse {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [number, number, number]
  },
  properties: {
    meta: {
      updated_at: string,
      units: {
        air_pressure_at_sea_level: "hPa",
        air_temperature: "celsius",
        air_temperature_max: "celsius",
        air_temperature_min: "celsius",
        cloud_area_fraction: "%",
        cloud_area_fraction_high: "%",
        cloud_area_fraction_low: "%",
        cloud_area_fraction_medium: "%",
        dew_point_temperature: "celsius",
        fog_area_fraction: "%",
        precipitation_amount: "mm",
        relative_humidity: "%",
        ultraviolet_index_clear_sky: "1",
        wind_from_direction: "degrees",
        wind_speed: "m/s"
      }
    },
    timeseries: Array<{
      time: string,
      data: WeatherData
    }>
  }
}

export type FetchWeatherParams = {
  lat: number
  lon: number
}

export const fetchWeather = (params?: FetchWeatherParams) => (
  weatherApi.get('weatherapi/locationforecast/2.0/compact', {
    searchParams: params
  }).then(res => res.json<WeatherResponse>())
);