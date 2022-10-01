import kyUniversal from 'ky-universal';

const geocodeApi = kyUniversal.create({
  prefixUrl: 'https://nominatim.openstreetmap.org/',
  searchParams: {
    format: 'json'
  },
});

export type ReverseSearchParams = {
  lat: number
  lon: number
}

export interface ReverseSearchResponse {
  place_id: number,
  osm_type: string,
  osm_id: number,
  lat: string,
  lon: string,
  display_name: string,
  address: {
    amenity?: string,
    house_number?: string,
    road?: string,
    suburb?: string,
    city?: string,
    state?: string,
    postcode?: string,
    village?: string,
    state_district?: string,
    country?: string,
    country_code?: string
  },
  boundingbox: [string, string, string, string]
}

export type SearchResponse = Array<{
  boundingbox: [string, string, string, string],
  class: string,
  display_name: string,
  icon: string,
  importance: number,
  lat: string,
  lon: string,
  osm_id: number,
  osm_type: string,
  place_id: number,
  type: string
}>

export const reverseSearchLocation = (params?: ReverseSearchParams) => (
  geocodeApi.get('reverse', {
    searchParams: params
  }).then(res => res.json<ReverseSearchResponse>())
);

export const searchLocation = (q?: string) => (
  geocodeApi.get('search', {
    searchParams: q ? { q } : undefined
  })
    .then(res => res.json<SearchResponse>())
    .then(arr => arr[0])
);