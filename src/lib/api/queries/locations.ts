import { createQueryKeys } from '@lukemorales/query-key-factory';
import { SavedLocation } from '@prisma/client';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetchLocations, LocationToSave, saveLocation } from 'lib/api/locations';

export const locationKeys = createQueryKeys('location', {
  save: () => ({ operation: 'save' }),
  all: () => ['all']
});

export const saveLocationMutation = (): UseMutationOptions<unknown, unknown, LocationToSave> => ({
  mutationKey: locationKeys.save(),
  mutationFn: (location: LocationToSave) => saveLocation(location),
});

export const savedLocationsQuery = (): UseQueryOptions<SavedLocation[]> => ({
  queryKey: locationKeys.all(),
  queryFn: () => fetchLocations()
});