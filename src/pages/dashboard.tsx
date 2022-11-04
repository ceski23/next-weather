import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import Button from 'components/common/Button';
import SearchInput from 'components/common/SearchInput';
import InfoCard from 'components/weather/InfoCard';
import { ProgressRing } from 'components/weather/ProgressRing';
import { UVScale } from 'components/weather/UVScale';
import WeatherCard from 'components/weather/WeatherCard';
import { WeekWeatherPanel } from 'components/weather/WeekWeatherPanel';
import { WindRose } from 'components/weather/WindRose';
import { addDays, endOfWeek, format, startOfWeek, subDays } from 'date-fns';
import { saveLocationMutation } from 'lib/api/queries/locations';
import { weatherQuery } from 'lib/api/queries/weather';
import { useLocation } from 'lib/hooks/location';
import { calcProgress } from 'lib/utils/math';
import { mediaQueryUp } from 'lib/utils/styles';
import { getWeatherDescription, getWeatherIcon, transformCurrentWeather, transformWeeklyWeather } from 'lib/utils/weather';
import { useSession } from 'next-auth/react';
import Image from 'next/future/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppPage } from 'pages/_app';
import { useState } from 'react';

const Dashboard: AppPage = () => {
  const { data: session } = useSession();  
  const router = useRouter();
  const query = router.query.location?.toString() ?? '';
  const { coords, locationText } = useLocation(query);
  const { mutate: saveLocation } = useMutation(saveLocationMutation());
  const [selectedWeekDates, setSelectedWeekDates] = useState({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date())
  });

  const todayWeather = useQuery({ ...weatherQuery(coords), enabled: !!coords });
  const currentWeather = transformCurrentWeather(todayWeather.data);
  const weatherUnits = todayWeather.data?.hourly_units;

  const weeklyWeather = useQuery({
    ...weatherQuery(coords ? {
      ...coords,
      start_date: format(selectedWeekDates.start, 'yyyy-MM-dd'),
      end_date: format(selectedWeekDates.end, 'yyyy-MM-dd'),
    } : undefined),
    enabled: !!coords
  });

  const handleQueryChange = (location: string) => {
    if (location.length === 0) router.push({ query: undefined });
    else router.push({ query: { location } });
  }

  const handleSaveLocation = () => {
    if (!locationText || !coords) return;

    saveLocation({
      name: locationText,
      lat: coords.latitude,
      lon: coords.longitude
    });
  }

  return (
    <Container>
      <Head>
        {currentWeather && locationText && (
          <title key="title">{currentWeather.apparent_temperature}°C - {locationText} - NextWeather</title>
        )}
        {currentWeather && (
          <link rel="icon" type="image/svg+xml" href={getWeatherIcon(currentWeather.weathercode)} key="favicon" />
        )}
      </Head>

      <MainColumn>
        <Header>
          <SearchInput onDebouncedChange={handleQueryChange} key={query} defaultValue={query} placeholder="Search for a place..." />
          {session?.user?.image && session.user.name && (
            <Avatar src={session.user.image} alt={session.user.name} width={45} height={45} />
          )}
        </Header>

        {todayWeather.status === 'loading' && <WeatherCard.Placeholder />}
        {currentWeather && weatherUnits && (
          <WeatherCard
            key={query}
            location={locationText}
            humidity={currentWeather.relativehumidity_2m + weatherUnits.relativehumidity_2m}
            pressure={currentWeather.surface_pressure + weatherUnits.surface_pressure}
            updateDate={new Date(currentWeather.time)}
            windSpeed={currentWeather.windspeed_10m + weatherUnits.windspeed_10m}
            temperature={currentWeather.apparent_temperature?.toString()}
            description={getWeatherDescription(currentWeather.weathercode)}
          />
        )}

        {session?.user && (
          <div style={{ marginTop: 20 }}>
            <Button onClick={handleSaveLocation}>Save to favourites</Button>
          </div>
        )}

        {todayWeather.status === 'loading' && (
          <InfoGrid>
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
          </InfoGrid>
        )}
        {currentWeather && weatherUnits && (
          <InfoGrid>
            <InfoCard
              title='Wind'
              description='Today wind speed'
              value={currentWeather.windspeed_10m + weatherUnits.windspeed_10m}
              content={<WindRose direction={currentWeather.windspeed_10m ?? 0} />}
            />

            <InfoCard
              title='Precipitation amount'
              description='Today precipitation amount'
              value={currentWeather.precipitation + weatherUnits.precipitation}
              content={<ProgressRing text='Low' progress={calcProgress(0, 500, Number(0))} />}
            />

            <InfoCard
              title='Pressure'
              description='Today pressure'
              value={currentWeather.surface_pressure + weatherUnits.surface_pressure}
              content={<ProgressRing text='Normal' progress={calcProgress(900, 1090, currentWeather.surface_pressure ?? 0)} />}
            />

            <InfoCard
              title='UV Index'
              description='Today UV index'
              value={'0'}
              content={<UVScale text='Low' progress={0} />}
            />
          </InfoGrid>
        )}
      </MainColumn>

      <RightSidebar>
        {weeklyWeather.status === 'success' && (
          <WeekWeatherPanel
            weekDates={selectedWeekDates}
            onWeekChange={setSelectedWeekDates}
            data={transformWeeklyWeather(weeklyWeather.data, [6, 12, 18, 23])}
            min={subDays(new Date(), 148)}
            max={addDays(new Date(), 8)}
          />
        )}
      </RightSidebar>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  ${mediaQueryUp('xl')} {
    flex-direction: row;
  }
`;

const MainColumn = styled.div`
  padding: 15px;
  flex: 1;

  ${mediaQueryUp('sm')} {
    padding: 35px 50px;
  }
`;

const RightSidebar = styled.div`
  border-left: 2px solid ${props => props.theme.colors.border};
  width: 100%;
  height: 100%;

  ${mediaQueryUp('xl')} {
    width: 400px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 30px;

  ${mediaQueryUp('lg')} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;