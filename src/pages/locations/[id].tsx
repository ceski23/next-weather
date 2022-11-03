import { SavedLocation } from '@prisma/client';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import WeatherCard from 'components/weather/WeatherCard';
import { weatherQuery } from 'lib/api/queries/weather';
import prisma from 'lib/prisma';
import { getWeatherDescription, transformCurrentWeather } from 'lib/utils/weather';
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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(weatherQuery({
    latitude: savedLocation.lat,
    longitude: savedLocation.lon
  }));
  
  return {
    props: {
      location: savedLocation,
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const SavedLocationPage: AppPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ location }) => {
  const weather = useQuery(weatherQuery({
    latitude: location.lat,
    longitude: location.lon
  }));
  const currentWeather = transformCurrentWeather(weather.data);
  const weatherUnits = weather.data?.hourly_units;

  return (
    <>
      {weather.status === 'loading' && <WeatherCard.Placeholder />}
      {currentWeather && weatherUnits && (
        <WeatherCard
          location={location.name}
          humidity={currentWeather.relativehumidity_2m + weatherUnits.relativehumidity_2m}
          pressure={currentWeather.surface_pressure + weatherUnits.surface_pressure}
          updateDate={new Date(currentWeather.time)}
          windSpeed={currentWeather.windspeed_10m + weatherUnits.windspeed_10m}
          temperature={currentWeather.apparent_temperature?.toString()}
          description={getWeatherDescription(currentWeather.weathercode)}
        />
      )}
    </>
  )
}

export default SavedLocationPage;