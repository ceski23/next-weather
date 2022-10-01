import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchLocations, LocationToSave, saveLocation } from 'lib/api/locations';

export const locationKeys = createQueryKeys('location', {
  save: () => ({ operation: 'save' }),
  all: () => ['all']
});

export const useSaveLocation = () => (
  useMutation(
    locationKeys.save(),
    (location: LocationToSave) => saveLocation(location),
  )
);

export const useSavedLocations = () => (
  useQuery(
    locationKeys.all(),
    () => fetchLocations()
  )
);