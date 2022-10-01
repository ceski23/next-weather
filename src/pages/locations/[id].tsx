import { SavedLocation } from '@prisma/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import WeatherCard from 'components/weather/WeatherCard';
import { fetchWeather } from 'lib/api/weather';
import { useWeather, weatherKeys } from 'lib/hooks/weather';
import prisma from 'lib/prisma';
import { getWeatherDescription } from 'lib/utils/weather';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { AppPage } from 'pages/_app';
import { ParsedUrlQuery } from 'querystring';

interface LocationQueryParams extends ParsedUrlQuery {
  id: string;
}

interface SavedLocationProps {
  location: SavedLocation;
}

export const getServerSideProps: GetServerSideProps<SavedLocationProps, LocationQueryParams> = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return {
    redirect: { destination: '/api/auth/signin', permanent: false }
  }

  const savedLocation = await prisma.savedLocation.findFirst({
    where: {
      id: params?.id,
      userId: session.userId as string
    }
  });

  if (!savedLocation) return { notFound: true }

  const coords = {
    lat: savedLocation.lat,
    lon: savedLocation.lon
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(weatherKeys.byLocation(coords), () => fetchWeather(coords));
  
  return {
    props: {
      location: savedLocation,
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const SavedLocationPage: AppPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ location }) => {
  const weather = useWeather({
    lat: location.lat,
    lon: location.lon
  });
  const currentWeather = weather.data?.properties.timeseries[0].data;

  return (
    <>
      {weather.status === 'loading' && <WeatherCard.Placeholder />}
      {weather.status === 'success' && (
        <WeatherCard
          location={location.name}
          humidity={currentWeather?.instant.details.relative_humidity + weather.data.properties.meta.units.relative_humidity}
          pressure={currentWeather?.instant.details.air_pressure_at_sea_level + weather.data.properties.meta.units.air_pressure_at_sea_level}
          updateDate={new Date(weather.data.properties.meta.updated_at)}
          windSpeed={currentWeather?.instant.details.wind_speed + weather.data.properties.meta.units.wind_speed}
          temperature={String(currentWeather?.instant.details.air_temperature)}
          description={getWeatherDescription(currentWeather?.next_1_hours.summary.symbol_code)}
        />
      )}
    </>
  )
}

export default SavedLocationPage;