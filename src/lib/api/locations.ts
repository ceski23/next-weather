import { SavedLocation } from '@prisma/client';
import kyUniversal from 'ky-universal';

const api = kyUniversal.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
  credentials: 'include'
});

export type LocationToSave = {
  name: string
  lat: number
  lon: number
}

export const saveLocation = (location: LocationToSave) => (
  api.post('locations', {
    json: location
  }).then(res => res.json())
);

export const fetchLocations = () => (
  api.get('locations').then(res => res.json<SavedLocation[]>())
);