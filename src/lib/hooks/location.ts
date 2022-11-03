import { useQuery } from '@tanstack/react-query';
import { reverseSearchLocationQuery, searchLocationQuery } from 'lib/api/queries/geocode';
import { useGeolocation } from 'lib/hooks/geolocation';
import { formatLocationText } from 'lib/utils/weather';
import { useMemo } from 'react';

export const useLocation = (query: string) => {
  const geolocation = useGeolocation();
  const manualLocation = useQuery({ ...searchLocationQuery(query), enabled: !!query });

  const coords = useMemo(() => {
    if (query.length === 0) {
      return geolocation.location ? {
        latitude: geolocation.location.coords.latitude,
        longitude: geolocation.location.coords.longitude
      } : undefined;
    }

    return manualLocation.data ? {
      latitude: Number(manualLocation.data.lat),
      longitude: Number(manualLocation.data.lon)
    } : undefined;
  }, [geolocation.location, manualLocation.data, query.length]);

  const location = useQuery({
    ...reverseSearchLocationQuery(coords ? {
      lat: coords.latitude,
      lon: coords.longitude
    } : undefined),
    enabled: !!coords
  });

  const locationText = useMemo(() => {
    if (query.length === 0) {
      return formatLocationText(location.data?.address) ?? location.data?.display_name
    }

    return manualLocation.data?.display_name;
  }, [location.data, manualLocation.data?.display_name, query.length]);

  return {
    coords,
    location,
    locationText
  }
}