import { useEffect, useState } from 'react';

export const useGeolocation = (options?: PositionOptions) => {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation, setError, options);
  }, [options]);

  return {
    location,
    error,
  }
}